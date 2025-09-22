create table public.applications (
  user_id uuid not null default auth.uid (),
  created_at timestamp with time zone not null default now(),
  last_modified timestamp with time zone not null default now(),

  submission_timestamp timestamp with time zone null,
  approval_timestamp timestamp with time zone null,

  full_name text null,
  email_contact text null,
  email_google text null,
  pronouns text null,
  social_twitter text null,
  social_facebook text null,
  social_website text null,
  social_linkedin text null,
  reasons text null,
  feminism_definition text null,
  known_members text null,
  constraint applications_pkey primary key (user_id),
  constraint applications_user_id_key unique (user_id),
  constraint applications_user_id_fkey foreign KEY (user_id) references auth.users (id) on update CASCADE on delete CASCADE
  
) TABLESPACE pg_default;

create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.applications (user_id, full_name, email_contact, email_google)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.email, (
    CASE
      WHEN  to_json(new)->'raw_app_meta_data'->>'provider' = 'google' THEN new.email
      ELSE null
    END
  ));

  insert into public.user_roles(user_id, role)
  values (new.id, 'prospective_member');

  return new;
end;
$$;

drop trigger on_auth_user_created ON auth.users;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users  
  for each row execute procedure public.handle_new_user();
