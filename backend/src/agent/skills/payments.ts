import OpenAI from 'openai';
import { SupabaseClient } from '@supabase/supabase-js';

// ─── Tool Definitions ────────────────────────────────────────────────────────

export const paymentTools: OpenAI.ChatCompletionTool[] = [
  {
    type: 'function' as const,
    function: {
      name: 'list_payments',
      description:
        'List payments and invoices with optional status filter. Returns payments with client and project info.',
      parameters: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            enum: ['pending', 'paid', 'overdue', 'cancelled'],
            description: 'Filter by payment status',
          },
          limit: {
            type: 'number',
            description: 'Maximum number of records to return (default 20, max 100)',
          },
        },
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'create_payment',
      description: 'Create a new payment record or invoice.',
      parameters: {
        type: 'object',
        properties: {
          description: {
            type: 'string',
            description: 'Description of the payment or invoice',
          },
          amount: {
            type: 'number',
            description: 'Payment amount (positive number)',
          },
          client_id: {
            type: 'string',
            description: 'UUID of the associated client (optional)',
          },
          project_id: {
            type: 'string',
            description: 'UUID of the associated project (optional)',
          },
          due_date: {
            type: 'string',
            description: 'Payment due date in YYYY-MM-DD format',
          },
          invoice_number: {
            type: 'string',
            description: 'Invoice or reference number (optional)',
          },
        },
        required: ['description', 'amount'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'update_payment_status',
      description:
        'Update the status of a payment (e.g., mark as paid, overdue, or cancelled). When marking as paid, you can optionally provide the paid date.',
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The UUID of the payment to update',
          },
          status: {
            type: 'string',
            enum: ['pending', 'paid', 'overdue', 'cancelled'],
            description: 'New payment status',
          },
          paid_date: {
            type: 'string',
            description: 'Date payment was received, in YYYY-MM-DD format (required when status is "paid")',
          },
        },
        required: ['id', 'status'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'get_payment_summary',
      description:
        'Get a financial summary of all payments grouped by status, showing total amounts and counts.',
      parameters: {
        type: 'object',
        properties: {},
      },
    },
  },
];

// ─── Tool Handlers ────────────────────────────────────────────────────────────

export const paymentHandlers: Record<
  string,
  (supabase: SupabaseClient, userId: string, args: Record<string, unknown>) => Promise<unknown>
> = {
  list_payments: async (supabase, userId, args) => {
    const status = args.status as string | undefined;
    const limit = Math.min(Number(args.limit) || 20, 100);

    let query = supabase
      .from('payments')
      .select(
        'id, description, amount, status, due_date, paid_date, invoice_number, client_id, project_id, created_at, updated_at, clients(id, name, company), projects(id, name)'
      )
      .eq('user_id', userId)
      .order('due_date', { ascending: true })
      .limit(limit);

    if (status) query = query.eq('status', status);

    const { data, error } = await query;
    if (error) throw new Error(`Failed to list payments: ${error.message}`);
    return { payments: data, count: data?.length ?? 0 };
  },

  create_payment: async (supabase, userId, args) => {
    if (Number(args.amount) <= 0) {
      throw new Error('Payment amount must be greater than 0');
    }

    const payload: Record<string, unknown> = {
      user_id: userId,
      description: args.description,
      amount: args.amount,
      status: 'pending',
    };

    if (args.client_id !== undefined) payload.client_id = args.client_id;
    if (args.project_id !== undefined) payload.project_id = args.project_id;
    if (args.due_date !== undefined) payload.due_date = args.due_date;
    if (args.invoice_number !== undefined) payload.invoice_number = args.invoice_number;

    const { data, error } = await supabase.from('payments').insert(payload).select().single();

    if (error) throw new Error(`Failed to create payment: ${error.message}`);
    return {
      payment: data,
      message: `Payment record for "${args.description}" ($${args.amount}) created successfully`,
    };
  },

  update_payment_status: async (supabase, userId, args) => {
    const updates: Record<string, unknown> = { status: args.status };

    if (args.status === 'paid') {
      updates.paid_date = (args.paid_date as string) || new Date().toISOString().split('T')[0];
    }

    const { data, error } = await supabase
      .from('payments')
      .update(updates)
      .eq('id', args.id as string)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw new Error(`Failed to update payment status: ${error.message}`);
    if (!data) throw new Error(`Payment not found or permission denied: ${args.id}`);
    return {
      payment: data,
      message: `Payment status updated to "${args.status}"${args.status === 'paid' ? ` (paid on ${updates.paid_date})` : ''}`,
    };
  },

  get_payment_summary: async (supabase, userId, _args) => {
    const { data, error } = await supabase
      .from('payments')
      .select('status, amount, due_date')
      .eq('user_id', userId);

    if (error) throw new Error(`Failed to get payment summary: ${error.message}`);

    const summary: Record<string, { total: number; count: number }> = {};
    let grandTotal = 0;

    for (const payment of data ?? []) {
      const st = payment.status as string;
      if (!summary[st]) summary[st] = { total: 0, count: 0 };
      summary[st].total += Number(payment.amount);
      summary[st].count += 1;
      grandTotal += Number(payment.amount);
    }

    // Check for overdue payments (pending past due date)
    const today = new Date().toISOString().split('T')[0];
    const overdueCount = (data ?? []).filter(
      (p) => p.status === 'pending' && p.due_date && p.due_date < today
    ).length;

    const byStatus = Object.entries(summary).map(([status, vals]) => ({
      status,
      total: Math.round(vals.total * 100) / 100,
      count: vals.count,
    }));

    return {
      grand_total: Math.round(grandTotal * 100) / 100,
      by_status: byStatus,
      potentially_overdue: overdueCount,
      total_payments: data?.length ?? 0,
    };
  },
};
