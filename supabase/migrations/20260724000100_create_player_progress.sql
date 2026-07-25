create table if not exists public.player_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  progress jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.player_progress enable row level security;

create policy "Players can read their own progress"
on public.player_progress
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Players can create their own progress"
on public.player_progress
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Players can update their own progress"
on public.player_progress
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create index if not exists player_progress_updated_at_idx
on public.player_progress (updated_at desc);
