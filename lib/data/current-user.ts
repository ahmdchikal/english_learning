import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/database";

export interface CurrentUser {
  id: string;
  email: string | null;
  profile: Profile | null;
}

/** Fetches the current session's user + profile row, or null if signed out. */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userData.user.id)
    .single();

  return {
    id: userData.user.id,
    email: userData.user.email ?? null,
    profile: (profile as Profile) ?? null,
  };
}

export async function requireAdminUser(): Promise<CurrentUser | null> {
  const user = await getCurrentUser();
  if (!user || user.profile?.role !== "admin") return null;
  return user;
}
