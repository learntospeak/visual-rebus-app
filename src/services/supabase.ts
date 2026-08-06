import { createClient } from '@supabase/supabase-js'
import type { SavedProgress } from '../types'

const url = import.meta.env.VITE_SUPABASE_URL
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const isSupabaseConfigured = Boolean(url && publishableKey)

export const supabase = isSupabaseConfigured
  ? createClient(url, publishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null

export async function loadCloudProgress(userId: string): Promise<SavedProgress | null> {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('player_progress')
    .select('progress')
    .eq('user_id', userId)
    .maybeSingle()

  if (error) throw error
  return (data?.progress as SavedProgress | undefined) ?? null
}

export async function saveCloudProgress(userId: string, progress: SavedProgress) {
  if (!supabase) return
  const { error } = await supabase
    .from('player_progress')
    .upsert({ user_id: userId, progress, updated_at: new Date().toISOString() })

  if (error) throw error
}

export async function deleteCloudAccount() {
  if (!supabase) throw new Error('Cloud accounts are not configured yet.')
  const { error } = await supabase.functions.invoke('delete-account', { body: {} })
  if (error) throw error
}
