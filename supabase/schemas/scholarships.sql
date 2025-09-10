create table public.scholarships (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  recipient_user_id uuid not null,
  reviewed_by_user_id uuid null,
  reviewed_at timestamp with time zone null,
  approved boolean null,
  notes text null,
  expire_at timestamp with time zone null,
  constraint scholarships_pkey primary key (id),
  constraint scholarships_recipient_user_id_fkey foreign KEY (recipient_user_id) references users (id) on delete set default,
  constraint scholarships_reviewed_by_user_id_fkey foreign KEY (reviewed_by_user_id) references users (id)
) TABLESPACE pg_default;
