import OpenAI from 'openai';
import { SupabaseClient } from '@supabase/supabase-js';

// ─── Tool Definitions ────────────────────────────────────────────────────────

export const bookingTools: OpenAI.ChatCompletionTool[] = [
  {
    type: 'function' as const,
    function: {
      name: 'list_bookings',
      description:
        'List scheduled bookings and meetings with optional filters. Returns bookings with client information.',
      parameters: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            enum: ['scheduled', 'confirmed', 'cancelled', 'completed'],
            description: 'Filter by booking status',
          },
          start_date: {
            type: 'string',
            description:
              'Filter bookings starting on or after this date/datetime (ISO 8601 format)',
          },
          end_date: {
            type: 'string',
            description:
              'Filter bookings starting on or before this date/datetime (ISO 8601 format)',
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
      name: 'create_booking',
      description: 'Create a new booking or meeting appointment.',
      parameters: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: 'Title or subject of the meeting/booking',
          },
          client_id: {
            type: 'string',
            description: 'UUID of the associated client (optional)',
          },
          start_time: {
            type: 'string',
            description: 'Start time in ISO 8601 format (e.g., 2024-01-15T10:00:00Z)',
          },
          end_time: {
            type: 'string',
            description: 'End time in ISO 8601 format (e.g., 2024-01-15T11:00:00Z)',
          },
          description: {
            type: 'string',
            description: 'Additional description or agenda for the meeting',
          },
          location: {
            type: 'string',
            description: 'Physical location of the meeting',
          },
          meeting_url: {
            type: 'string',
            description: 'URL for virtual meeting (Zoom, Google Meet, Teams, etc.)',
          },
        },
        required: ['title', 'start_time', 'end_time'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'update_booking_status',
      description:
        'Update the status of an existing booking (e.g., confirm, cancel, or mark as completed).',
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The UUID of the booking to update',
          },
          status: {
            type: 'string',
            enum: ['scheduled', 'confirmed', 'cancelled', 'completed'],
            description: 'New status for the booking',
          },
        },
        required: ['id', 'status'],
      },
    },
  },
];

// ─── Tool Handlers ────────────────────────────────────────────────────────────

export const bookingHandlers: Record<
  string,
  (supabase: SupabaseClient, userId: string, args: Record<string, unknown>) => Promise<unknown>
> = {
  list_bookings: async (supabase, userId, args) => {
    const status = args.status as string | undefined;
    const startDate = args.start_date as string | undefined;
    const endDate = args.end_date as string | undefined;
    const limit = Math.min(Number(args.limit) || 20, 100);

    let query = supabase
      .from('bookings')
      .select(
        'id, title, description, start_time, end_time, location, meeting_url, status, client_id, created_at, updated_at, clients(id, name, email, company)'
      )
      .eq('user_id', userId)
      .order('start_time', { ascending: true })
      .limit(limit);

    if (status) query = query.eq('status', status);
    if (startDate) query = query.gte('start_time', startDate);
    if (endDate) query = query.lte('start_time', endDate);

    const { data, error } = await query;
    if (error) throw new Error(`Failed to list bookings: ${error.message}`);
    return { bookings: data, count: data?.length ?? 0 };
  },

  create_booking: async (supabase, userId, args) => {
    // Validate that end_time is after start_time
    const startTime = new Date(args.start_time as string);
    const endTime = new Date(args.end_time as string);
    if (endTime <= startTime) {
      throw new Error('end_time must be after start_time');
    }

    const payload: Record<string, unknown> = {
      user_id: userId,
      title: args.title,
      start_time: args.start_time,
      end_time: args.end_time,
      status: 'scheduled',
    };

    if (args.client_id !== undefined) payload.client_id = args.client_id;
    if (args.description !== undefined) payload.description = args.description;
    if (args.location !== undefined) payload.location = args.location;
    if (args.meeting_url !== undefined) payload.meeting_url = args.meeting_url;

    const { data, error } = await supabase.from('bookings').insert(payload).select().single();

    if (error) throw new Error(`Failed to create booking: ${error.message}`);
    return {
      booking: data,
      message: `Booking "${args.title}" scheduled for ${startTime.toLocaleDateString()} at ${startTime.toLocaleTimeString()}`,
    };
  },

  update_booking_status: async (supabase, userId, args) => {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status: args.status })
      .eq('id', args.id as string)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw new Error(`Failed to update booking status: ${error.message}`);
    if (!data) throw new Error(`Booking not found or permission denied: ${args.id}`);
    return {
      booking: data,
      message: `Booking status updated to "${args.status}"`,
    };
  },
};
