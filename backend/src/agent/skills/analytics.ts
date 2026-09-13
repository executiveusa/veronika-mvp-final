import OpenAI from 'openai';
import { SupabaseClient } from '@supabase/supabase-js';

// ─── Tool Definitions ────────────────────────────────────────────────────────

export const analyticsTools: OpenAI.ChatCompletionTool[] = [
  {
    type: 'function' as const,
    function: {
      name: 'get_dashboard_summary',
      description:
        'Get a high-level summary of the business dashboard: total counts of clients, active projects, upcoming bookings, and pending payment totals. Use this for a quick business overview.',
      parameters: {
        type: 'object',
        properties: {},
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'get_revenue_summary',
      description:
        'Get a revenue summary showing paid payments over a specified time period, broken down by month.',
      parameters: {
        type: 'object',
        properties: {
          period: {
            type: 'string',
            enum: ['week', 'month', 'quarter', 'year'],
            description: "Time period for the revenue summary (default: 'month')",
          },
        },
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'get_upcoming_schedule',
      description:
        'Get the upcoming schedule of bookings and meetings for the next N days. Useful for planning.',
      parameters: {
        type: 'object',
        properties: {
          days: {
            type: 'number',
            description: 'Number of days ahead to look (default 7, max 90)',
          },
        },
      },
    },
  },
];

// ─── Helper: period to start date ────────────────────────────────────────────

function getPeriodStartDate(period: string): string {
  const now = new Date();
  switch (period) {
    case 'week':
      now.setDate(now.getDate() - 7);
      break;
    case 'month':
      now.setMonth(now.getMonth() - 1);
      break;
    case 'quarter':
      now.setMonth(now.getMonth() - 3);
      break;
    case 'year':
      now.setFullYear(now.getFullYear() - 1);
      break;
    default:
      now.setMonth(now.getMonth() - 1);
  }
  return now.toISOString().split('T')[0];
}

// ─── Tool Handlers ────────────────────────────────────────────────────────────

export const analyticsHandlers: Record<
  string,
  (supabase: SupabaseClient, userId: string, args: Record<string, unknown>) => Promise<unknown>
> = {
  get_dashboard_summary: async (supabase, userId, _args) => {
    const today = new Date().toISOString();
    const sevenDaysAhead = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    // Run all queries in parallel
    const [
      clientsResult,
      activeProjectsResult,
      upcomingBookingsResult,
      pendingPaymentsResult,
      overduePaymentsResult,
    ] = await Promise.all([
      supabase
        .from('clients')
        .select('id, status', { count: 'exact', head: false })
        .eq('user_id', userId),
      supabase
        .from('projects')
        .select('id', { count: 'exact', head: false })
        .eq('user_id', userId)
        .eq('status', 'in-progress'),
      supabase
        .from('bookings')
        .select('id, title, start_time, end_time, clients(name)', { count: 'exact', head: false })
        .eq('user_id', userId)
        .in('status', ['scheduled', 'confirmed'])
        .gte('start_time', today)
        .lte('start_time', sevenDaysAhead)
        .order('start_time', { ascending: true }),
      supabase
        .from('payments')
        .select('amount')
        .eq('user_id', userId)
        .eq('status', 'pending'),
      supabase
        .from('payments')
        .select('amount')
        .eq('user_id', userId)
        .eq('status', 'overdue'),
    ]);

    const clients = clientsResult.data ?? [];
    const activeClients = clients.filter((c) => c.status === 'active').length;
    const leadClients = clients.filter((c) => c.status === 'lead').length;

    const pendingTotal = (pendingPaymentsResult.data ?? []).reduce(
      (sum, p) => sum + Number(p.amount),
      0
    );
    const overdueTotal = (overduePaymentsResult.data ?? []).reduce(
      (sum, p) => sum + Number(p.amount),
      0
    );

    return {
      clients: {
        total: clients.length,
        active: activeClients,
        leads: leadClients,
      },
      projects: {
        active: activeProjectsResult.data?.length ?? 0,
      },
      bookings: {
        upcoming_7_days: upcomingBookingsResult.data?.length ?? 0,
        next_meetings: upcomingBookingsResult.data?.slice(0, 3) ?? [],
      },
      payments: {
        pending_total: Math.round(pendingTotal * 100) / 100,
        overdue_total: Math.round(overdueTotal * 100) / 100,
      },
      generated_at: new Date().toISOString(),
    };
  },

  get_revenue_summary: async (supabase, userId, args) => {
    const period = (args.period as string) || 'month';
    const startDate = getPeriodStartDate(period);

    const { data, error } = await supabase
      .from('payments')
      .select('amount, paid_date, status, description')
      .eq('user_id', userId)
      .eq('status', 'paid')
      .gte('paid_date', startDate)
      .order('paid_date', { ascending: true });

    if (error) throw new Error(`Failed to get revenue summary: ${error.message}`);

    // Group by month
    const byMonth: Record<string, number> = {};
    let totalRevenue = 0;

    for (const payment of data ?? []) {
      const month = (payment.paid_date as string).substring(0, 7); // YYYY-MM
      byMonth[month] = (byMonth[month] || 0) + Number(payment.amount);
      totalRevenue += Number(payment.amount);
    }

    const monthlyBreakdown = Object.entries(byMonth)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, amount]) => ({
        month,
        revenue: Math.round(amount * 100) / 100,
      }));

    return {
      period,
      start_date: startDate,
      end_date: new Date().toISOString().split('T')[0],
      total_revenue: Math.round(totalRevenue * 100) / 100,
      payment_count: data?.length ?? 0,
      by_month: monthlyBreakdown,
    };
  },

  get_upcoming_schedule: async (supabase, userId, args) => {
    const days = Math.min(Number(args.days) || 7, 90);
    const now = new Date();
    const future = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    const { data, error } = await supabase
      .from('bookings')
      .select(
        'id, title, description, start_time, end_time, location, meeting_url, status, clients(id, name, email)'
      )
      .eq('user_id', userId)
      .in('status', ['scheduled', 'confirmed'])
      .gte('start_time', now.toISOString())
      .lte('start_time', future.toISOString())
      .order('start_time', { ascending: true });

    if (error) throw new Error(`Failed to get upcoming schedule: ${error.message}`);

    return {
      days_ahead: days,
      from: now.toISOString(),
      to: future.toISOString(),
      bookings: data ?? [],
      count: data?.length ?? 0,
    };
  },
};
