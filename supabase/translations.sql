create table if not exists public.translations (
  locale text primary key check (locale in ('en', 'ar')),
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.translations enable row level security;

drop policy if exists "translations are publicly readable" on public.translations;
create policy "translations are publicly readable"
on public.translations
for select
to anon, authenticated
using (true);

