import OpenAI from 'openai';
import { SupabaseClient } from '@supabase/supabase-js';

import { clientTools, clientHandlers } from './clients';
import { projectTools, projectHandlers } from './projects';
import { expenseTools, expenseHandlers } from './expenses';
import { bookingTools, bookingHandlers } from './bookings';
import { paymentTools, paymentHandlers } from './payments';
import { noteTools, noteHandlers } from './notes';
import { analyticsTools, analyticsHandlers } from './analytics';

// The skill handler function signature
export type SkillHandler = (
  supabase: SupabaseClient,
  userId: string,
  args: Record<string, unknown>
) => Promise<unknown>;

// All OpenAI tool definitions combined
export const allTools: OpenAI.ChatCompletionTool[] = [
  ...clientTools,
  ...projectTools,
  ...expenseTools,
  ...bookingTools,
  ...paymentTools,
  ...noteTools,
  ...analyticsTools,
];

// All skill handlers mapped by tool name
export const skillHandlers: Record<string, SkillHandler> = {
  // Client skills
  list_clients: clientHandlers.list_clients,
  get_client: clientHandlers.get_client,
  create_client: clientHandlers.create_client,
  update_client: clientHandlers.update_client,
  search_clients: clientHandlers.search_clients,

  // Project skills
  list_projects: projectHandlers.list_projects,
  get_project: projectHandlers.get_project,
  create_project: projectHandlers.create_project,
  update_project_progress: projectHandlers.update_project_progress,

  // Expense skills
  list_expenses: expenseHandlers.list_expenses,
  create_expense: expenseHandlers.create_expense,
  get_expense_summary: expenseHandlers.get_expense_summary,

  // Booking skills
  list_bookings: bookingHandlers.list_bookings,
  create_booking: bookingHandlers.create_booking,
  update_booking_status: bookingHandlers.update_booking_status,

  // Payment skills
  list_payments: paymentHandlers.list_payments,
  create_payment: paymentHandlers.create_payment,
  update_payment_status: paymentHandlers.update_payment_status,
  get_payment_summary: paymentHandlers.get_payment_summary,

  // Note skills
  list_notes: noteHandlers.list_notes,
  create_note: noteHandlers.create_note,
  search_notes: noteHandlers.search_notes,

  // Analytics skills
  get_dashboard_summary: analyticsHandlers.get_dashboard_summary,
  get_revenue_summary: analyticsHandlers.get_revenue_summary,
  get_upcoming_schedule: analyticsHandlers.get_upcoming_schedule,
};
