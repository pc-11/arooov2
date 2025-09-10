create table public.users (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  email text not null default ''::text,
  first_name text not null,
  last_name text not null,
  last_login timestamp with time zone not null default now(),
  username text not null,
  middle_name text null,
  role public.roles not null,
  constraint users_pkey primary key (id)
) TABLESPACE pg_default;