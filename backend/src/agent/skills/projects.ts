import OpenAI from 'openai';
import { SupabaseClient } from '@supabase/supabase-js';

// ─── Tool Definitions ────────────────────────────────────────────────────────

export const projectTools: OpenAI.ChatCompletionTool[] = [
  {
    type: 'function' as const,
    function: {
      name: 'list_projects',
      description:
        'List projects with optional filters by status or client. Returns projects with client info.',
      parameters: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            enum: ['planning', 'in-progress', 'review', 'completed', 'on-hold'],
            description: 'Filter by project status',
          },
          client_id: {
            type: 'string',
            description: 'Filter by client UUID to get projects for a specific client',
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
      name: 'get_project',
      description:
        'Get a specific project by ID including all details and associated client information.',
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The UUID of the project to retrieve',
          },
        },
        required: ['id'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'create_project',
      description: 'Create a new project record.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Project name',
          },
          client_id: {
            type: 'string',
            description: 'UUID of the associated client (optional)',
          },
          description: {
            type: 'string',
            description: 'Project description',
          },
          status: {
            type: 'string',
            enum: ['planning', 'in-progress', 'review', 'completed', 'on-hold'],
            description: "Project status (default: 'planning')",
          },
          budget: {
            type: 'number',
            description: 'Project budget in the user\'s currency',
          },
          start_date: {
            type: 'string',
            description: 'Project start date in YYYY-MM-DD format',
          },
          due_date: {
            type: 'string',
            description: 'Project due date in YYYY-MM-DD format',
          },
        },
        required: ['name'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'update_project_progress',
      description:
        'Update a project\'s progress percentage and/or status. Use this to mark project milestones.',
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The UUID of the project to update',
          },
          progress: {
            type: 'number',
            description: 'Progress percentage from 0 to 100',
          },
          status: {
            type: 'string',
            enum: ['planning', 'in-progress', 'review', 'completed', 'on-hold'],
            description: 'Updated project status (optional)',
          },
        },
        required: ['id', 'progress'],
      },
    },
  },
];

// ─── Tool Handlers ────────────────────────────────────────────────────────────

export const projectHandlers: Record<
  string,
  (supabase: SupabaseClient, userId: string, args: Record<string, unknown>) => Promise<unknown>
> = {
  list_projects: async (supabase, userId, args) => {
    const status = args.status as string | undefined;
    const clientId = args.client_id as string | undefined;
    const limit = Math.min(Number(args.limit) || 20, 100);

    let query = supabase
      .from('projects')
      .select(
        'id, name, description, status, progress, start_date, due_date, budget, client_id, created_at, updated_at, clients(id, name, company)'
      )
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (status) {
      query = query.eq('status', status);
    }
    if (clientId) {
      query = query.eq('client_id', clientId);
    }

    const { data, error } = await query;
    if (error) throw new Error(`Failed to list projects: ${error.message}`);
    return { projects: data, count: data?.length ?? 0 };
  },

  get_project: async (supabase, userId, args) => {
    const { data, error } = await supabase
      .from('projects')
      .select(
        'id, name, description, status, progress, start_date, due_date, budget, client_id, created_at, updated_at, clients(id, name, email, company)'
      )
      .eq('id', args.id as string)
      .eq('user_id', userId)
      .single();

    if (error) throw new Error(`Failed to get project: ${error.message}`);
    if (!data) throw new Error(`Project not found: ${args.id}`);
    return { project: data };
  },

  create_project: async (supabase, userId, args) => {
    const payload: Record<string, unknown> = {
      user_id: userId,
      name: args.name,
      status: args.status || 'planning',
      progress: 0,
    };

    if (args.client_id !== undefined) payload.client_id = args.client_id;
    if (args.description !== undefined) payload.description = args.description;
    if (args.budget !== undefined) payload.budget = args.budget;
    if (args.start_date !== undefined) payload.start_date = args.start_date;
    if (args.due_date !== undefined) payload.due_date = args.due_date;

    const { data, error } = await supabase.from('projects').insert(payload).select().single();

    if (error) throw new Error(`Failed to create project: ${error.message}`);
    return { project: data, message: `Project "${args.name}" created successfully` };
  },

  update_project_progress: async (supabase, userId, args) => {
    const progress = Number(args.progress);
    if (progress < 0 || progress > 100) {
      throw new Error('Progress must be between 0 and 100');
    }

    const updates: Record<string, unknown> = { progress };
    if (args.status !== undefined) updates.status = args.status;

    // Auto-set status based on progress if not explicitly provided
    if (args.status === undefined) {
      if (progress === 100) updates.status = 'completed';
      else if (progress > 0) updates.status = 'in-progress';
    }

    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', args.id as string)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw new Error(`Failed to update project progress: ${error.message}`);
    if (!data) throw new Error(`Project not found or permission denied: ${args.id}`);
    return {
      project: data,
      message: `Project progress updated to ${progress}%${updates.status ? `, status set to "${updates.status}"` : ''}`,
    };
  },
};
