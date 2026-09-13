import OpenAI from 'openai';
import { SupabaseClient } from '@supabase/supabase-js';

// ─── Tool Definitions ────────────────────────────────────────────────────────

export const noteTools: OpenAI.ChatCompletionTool[] = [
  {
    type: 'function' as const,
    function: {
      name: 'list_notes',
      description:
        'List notes with optional filters by category, client, or project. Pinned notes appear first.',
      parameters: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            enum: ['general', 'meeting', 'idea', 'task', 'follow-up'],
            description: 'Filter by note category',
          },
          client_id: {
            type: 'string',
            description: 'Filter by client UUID to get notes related to a specific client',
          },
          project_id: {
            type: 'string',
            description: 'Filter by project UUID to get notes related to a specific project',
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
      name: 'create_note',
      description: 'Create a new note. Notes can be linked to clients or projects.',
      parameters: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: 'Title or heading of the note',
          },
          content: {
            type: 'string',
            description: 'Body content of the note (supports plain text)',
          },
          category: {
            type: 'string',
            enum: ['general', 'meeting', 'idea', 'task', 'follow-up'],
            description: "Category of the note (default: 'general')",
          },
          client_id: {
            type: 'string',
            description: 'UUID of the associated client (optional)',
          },
          project_id: {
            type: 'string',
            description: 'UUID of the associated project (optional)',
          },
          is_pinned: {
            type: 'boolean',
            description: 'Whether to pin this note to the top (default: false)',
          },
        },
        required: ['title'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'search_notes',
      description:
        'Search notes by title or content using a text query. Returns matching notes sorted by relevance.',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search term to match against note title and content',
          },
        },
        required: ['query'],
      },
    },
  },
];

// ─── Tool Handlers ────────────────────────────────────────────────────────────

export const noteHandlers: Record<
  string,
  (supabase: SupabaseClient, userId: string, args: Record<string, unknown>) => Promise<unknown>
> = {
  list_notes: async (supabase, userId, args) => {
    const category = args.category as string | undefined;
    const clientId = args.client_id as string | undefined;
    const projectId = args.project_id as string | undefined;
    const limit = Math.min(Number(args.limit) || 20, 100);

    let query = supabase
      .from('notes')
      .select(
        'id, title, content, category, is_pinned, client_id, project_id, created_at, updated_at, clients(id, name), projects(id, name)'
      )
      .eq('user_id', userId)
      .order('is_pinned', { ascending: false })
      .order('updated_at', { ascending: false })
      .limit(limit);

    if (category) query = query.eq('category', category);
    if (clientId) query = query.eq('client_id', clientId);
    if (projectId) query = query.eq('project_id', projectId);

    const { data, error } = await query;
    if (error) throw new Error(`Failed to list notes: ${error.message}`);
    return { notes: data, count: data?.length ?? 0 };
  },

  create_note: async (supabase, userId, args) => {
    const payload: Record<string, unknown> = {
      user_id: userId,
      title: args.title,
      category: args.category || 'general',
      is_pinned: args.is_pinned || false,
    };

    if (args.content !== undefined) payload.content = args.content;
    if (args.client_id !== undefined) payload.client_id = args.client_id;
    if (args.project_id !== undefined) payload.project_id = args.project_id;

    const { data, error } = await supabase.from('notes').insert(payload).select().single();

    if (error) throw new Error(`Failed to create note: ${error.message}`);
    return {
      note: data,
      message: `Note "${args.title}" created successfully${args.is_pinned ? ' (pinned)' : ''}`,
    };
  },

  search_notes: async (supabase, userId, args) => {
    const query = args.query as string;
    const searchTerm = `%${query}%`;

    const { data, error } = await supabase
      .from('notes')
      .select(
        'id, title, content, category, is_pinned, client_id, project_id, created_at, updated_at, clients(id, name), projects(id, name)'
      )
      .eq('user_id', userId)
      .or(`title.ilike.${searchTerm},content.ilike.${searchTerm}`)
      .order('is_pinned', { ascending: false })
      .order('updated_at', { ascending: false })
      .limit(20);

    if (error) throw new Error(`Failed to search notes: ${error.message}`);
    return { notes: data, count: data?.length ?? 0, query };
  },
};
