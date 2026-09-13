import OpenAI from 'openai';
import { SupabaseClient } from '@supabase/supabase-js';

// ─── Tool Definitions ────────────────────────────────────────────────────────

export const expenseTools: OpenAI.ChatCompletionTool[] = [
  {
    type: 'function' as const,
    function: {
      name: 'list_expenses',
      description:
        'List expenses with optional filters by category and date range. Returns expenses in reverse chronological order.',
      parameters: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            enum: ['software', 'marketing', 'travel', 'office', 'contractor', 'other'],
            description: 'Filter by expense category',
          },
          start_date: {
            type: 'string',
            description: 'Start date filter in YYYY-MM-DD format (inclusive)',
          },
          end_date: {
            type: 'string',
            description: 'End date filter in YYYY-MM-DD format (inclusive)',
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
      name: 'create_expense',
      description: 'Record a new business expense.',
      parameters: {
        type: 'object',
        properties: {
          description: {
            type: 'string',
            description: 'Description of the expense',
          },
          amount: {
            type: 'number',
            description: 'Expense amount (positive number)',
          },
          category: {
            type: 'string',
            enum: ['software', 'marketing', 'travel', 'office', 'contractor', 'other'],
            description: 'Expense category',
          },
          date: {
            type: 'string',
            description: 'Date of the expense in YYYY-MM-DD format',
          },
          project_id: {
            type: 'string',
            description: 'UUID of the associated project (optional)',
          },
        },
        required: ['description', 'amount', 'category', 'date'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'get_expense_summary',
      description:
        'Get a summary of expenses grouped by category with totals. Optionally filter by date range.',
      parameters: {
        type: 'object',
        properties: {
          start_date: {
            type: 'string',
            description: 'Start date in YYYY-MM-DD format for the summary period',
          },
          end_date: {
            type: 'string',
            description: 'End date in YYYY-MM-DD format for the summary period',
          },
        },
      },
    },
  },
];

// ─── Tool Handlers ────────────────────────────────────────────────────────────

export const expenseHandlers: Record<
  string,
  (supabase: SupabaseClient, userId: string, args: Record<string, unknown>) => Promise<unknown>
> = {
  list_expenses: async (supabase, userId, args) => {
    const category = args.category as string | undefined;
    const startDate = args.start_date as string | undefined;
    const endDate = args.end_date as string | undefined;
    const limit = Math.min(Number(args.limit) || 20, 100);

    let query = supabase
      .from('expenses')
      .select(
        'id, description, amount, category, date, status, project_id, receipt_url, created_at, updated_at, projects(id, name)'
      )
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(limit);

    if (category) query = query.eq('category', category);
    if (startDate) query = query.gte('date', startDate);
    if (endDate) query = query.lte('date', endDate);

    const { data, error } = await query;
    if (error) throw new Error(`Failed to list expenses: ${error.message}`);
    return { expenses: data, count: data?.length ?? 0 };
  },

  create_expense: async (supabase, userId, args) => {
    if (Number(args.amount) <= 0) {
      throw new Error('Expense amount must be greater than 0');
    }

    const payload: Record<string, unknown> = {
      user_id: userId,
      description: args.description,
      amount: args.amount,
      category: args.category,
      date: args.date,
      status: 'pending',
    };

    if (args.project_id !== undefined) payload.project_id = args.project_id;

    const { data, error } = await supabase.from('expenses').insert(payload).select().single();

    if (error) throw new Error(`Failed to create expense: ${error.message}`);
    return {
      expense: data,
      message: `Expense "${args.description}" of $${args.amount} recorded successfully`,
    };
  },

  get_expense_summary: async (supabase, userId, args) => {
    const startDate = args.start_date as string | undefined;
    const endDate = args.end_date as string | undefined;

    let query = supabase
      .from('expenses')
      .select('category, amount, date')
      .eq('user_id', userId);

    if (startDate) query = query.gte('date', startDate);
    if (endDate) query = query.lte('date', endDate);

    const { data, error } = await query;
    if (error) throw new Error(`Failed to get expense summary: ${error.message}`);

    // Aggregate by category
    const summary: Record<string, number> = {};
    let total = 0;

    for (const expense of data ?? []) {
      const cat = expense.category as string;
      summary[cat] = (summary[cat] || 0) + Number(expense.amount);
      total += Number(expense.amount);
    }

    const byCategory = Object.entries(summary).map(([category, amount]) => ({
      category,
      amount: Math.round(amount * 100) / 100,
      percentage: total > 0 ? Math.round((amount / total) * 10000) / 100 : 0,
    }));

    byCategory.sort((a, b) => b.amount - a.amount);

    return {
      total: Math.round(total * 100) / 100,
      by_category: byCategory,
      expense_count: data?.length ?? 0,
      period: { start_date: startDate || 'all time', end_date: endDate || 'all time' },
    };
  },
};
