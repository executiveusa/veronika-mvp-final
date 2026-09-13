import OpenAI from 'openai';
import { SupabaseClient } from '@supabase/supabase-js';

// ─── Tool Definitions ────────────────────────────────────────────────────────

export const clientTools: OpenAI.ChatCompletionTool[] = [
  {
    type: 'function' as const,
    function: {
      name: 'list_clients',
      description:
        'List clients from the database with optional filters. Returns a list of clients belonging to the current user.',
      parameters: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            enum: ['active', 'inactive', 'lead'],
            description: 'Filter clients by status',
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
      name: 'get_client',
      description: 'Get a specific client by their ID, including all their details.',
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The UUID of the client to retrieve',
          },
        },
        required: ['id'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'create_client',
      description: 'Create a new client record in the database.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Full name or business name of the client',
          },
          email: {
            type: 'string',
            description: 'Email address of the client',
          },
          phone: {
            type: 'string',
            description: 'Phone number of the client',
          },
          company: {
            type: 'string',
            description: 'Company or organisation name',
          },
          status: {
            type: 'string',
            enum: ['active', 'inactive', 'lead'],
            description: "Client status (default: 'active')",
          },
          notes: {
            type: 'string',
            description: 'Additional notes about the client',
          },
        },
        required: ['name'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'update_client',
      description: 'Update an existing client record. Only provide the fields you want to change.',
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The UUID of the client to update',
          },
          name: {
            type: 'string',
            description: 'Updated full name or business name',
          },
          email: {
            type: 'string',
            description: 'Updated email address',
          },
          phone: {
            type: 'string',
            description: 'Updated phone number',
          },
          company: {
            type: 'string',
            description: 'Updated company or organisation name',
          },
          status: {
            type: 'string',
            enum: ['active', 'inactive', 'lead'],
            description: 'Updated client status',
          },
          notes: {
            type: 'string',
            description: 'Updated notes',
          },
        },
        required: ['id'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'search_clients',
      description:
        'Search clients by name, email, or company name using a text query. Returns matching clients.',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search term to match against client name, email, or company',
          },
        },
        required: ['query'],
      },
    },
  },
];

// ─── Tool Handlers ────────────────────────────────────────────────────────────

export const clientHandlers: Record<
  string,
  (supabase: SupabaseClient, userId: string, args: Record<string, unknown>) => Promise<unknown>
> = {
  list_clients: async (supabase, userId, args) => {
    const status = args.status as string | undefined;
    const limit = Math.min(Number(args.limit) || 20, 100);

    let query = supabase
      .from('clients')
      .select('id, name, email, phone, company, status, notes, created_at, updated_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) throw new Error(`Failed to list clients: ${error.message}`);
    return { clients: data, count: data?.length ?? 0 };
  },

  get_client: async (supabase, userId, args) => {
    const { data, error } = await supabase
      .from('clients')
      .select('id, name, email, phone, company, status, notes, created_at, updated_at')
      .eq('id', args.id as string)
      .eq('user_id', userId)
      .single();

    if (error) throw new Error(`Failed to get client: ${error.message}`);
    if (!data) throw new Error(`Client not found: ${args.id}`);
    return { client: data };
  },

  create_client: async (supabase, userId, args) => {
    const payload: Record<string, unknown> = {
      user_id: userId,
      name: args.name,
      status: args.status || 'active',
    };

    if (args.email !== undefined) payload.email = args.email;
    if (args.phone !== undefined) payload.phone = args.phone;
    if (args.company !== undefined) payload.company = args.company;
    if (args.notes !== undefined) payload.notes = args.notes;

    const { data, error } = await supabase.from('clients').insert(payload).select().single();

    if (error) throw new Error(`Failed to create client: ${error.message}`);
    return { client: data, message: `Client "${args.name}" created successfully` };
  },

  update_client: async (supabase, userId, args) => {
    const { id, ...rest } = args;
    const updates: Record<string, unknown> = {};

    if (rest.name !== undefined) updates.name = rest.name;
    if (rest.email !== undefined) updates.email = rest.email;
    if (rest.phone !== undefined) updates.phone = rest.phone;
    if (rest.company !== undefined) updates.company = rest.company;
    if (rest.status !== undefined) updates.status = rest.status;
    if (rest.notes !== undefined) updates.notes = rest.notes;

    if (Object.keys(updates).length === 0) {
      throw new Error('No fields provided to update');
    }

    const { data, error } = await supabase
      .from('clients')
      .update(updates)
      .eq('id', id as string)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw new Error(`Failed to update client: ${error.message}`);
    if (!data) throw new Error(`Client not found or permission denied: ${id}`);
    return { client: data, message: 'Client updated successfully' };
  },

  search_clients: async (supabase, userId, args) => {
    const query = args.query as string;
    const searchTerm = `%${query}%`;

    const { data, error } = await supabase
      .from('clients')
      .select('id, name, email, phone, company, status, notes, created_at, updated_at')
      .eq('user_id', userId)
      .or(`name.ilike.${searchTerm},email.ilike.${searchTerm},company.ilike.${searchTerm}`)
      .order('name', { ascending: true })
      .limit(20);

    if (error) throw new Error(`Failed to search clients: ${error.message}`);
    return { clients: data, count: data?.length ?? 0, query };
  },
};
