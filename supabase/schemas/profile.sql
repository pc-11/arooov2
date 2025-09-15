create table public.profile (
  user_id uuid not null default auth.uid (),
  created_at timestamp with time zone not null default now(),
  last_modified timestamp with time zone not null default now(),
  display_name text null,
  pronounceable_name text null,
  pronouns text null,
  email_display text null,
  email_google text null,
  email_gravatar text null,
  social_twitter text null,
  social_facebook text null,
  social_website text null,
  social_linkedin text null,
  social_blog text null,
  summary text null,
  reasons text null,
  projects text null,
  skills text null,
  public_reasons boolean null,
  public_projects boolean null,
  public_skills boolean null,
  public_member boolean null,
  constraint profile_pkey primary key (user_id),
  constraint profile_user_id_key unique (user_id),
  constraint profile_user_id_fkey foreign KEY (user_id) references auth.users (id) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;

create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profile (user_id, display_name, email_display, email_google)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.email, (
    CASE
      WHEN  to_json(new)->'raw_app_meta_data'->>'provider' = 'google' THEN new.email
      ELSE null
    END
  ));
  return new;
end;
$$;

drop trigger on_auth_user_created ON auth.users;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users  
  for each row execute procedure public.handle_new_user();

