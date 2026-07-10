import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client. Bypasses Row Level Security entirely.
 *
 * SECURITY: this file is guarded by the `server-only` package, which makes
 * the build fail if it is ever imported from a Client Component. Use this
 * ONLY for narrow, well-audited server-side operations (e.g. admin user
 * management) that genuinely require bypassing RLS. Prefer the regular
 * server client (lib/supabase/server.ts) and RLS/RPC functions for
 * everything else.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY belum dikonfigurasi di environment variables.");
  }

  return createSupabaseClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
