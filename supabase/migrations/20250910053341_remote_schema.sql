drop extension if exists "pg_net";

create type "public"."roles" as enum ('board_member', 'code_of_conduct_coordinator', 'membership_coordinator', 'voting_coordinator', 'voting_member', 'key_member', 'member', 'prospective_member');


  create table "public"."profile" (
    "user_id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "last_modified" timestamp with time zone not null default now(),
    "pronounceable_name" text,
    "pronouns" text,
    "email_display" text,
    "email_google" text,
    "email_gravatar" text,
    "social_twitter" text,
    "social_facebook" text,
    "social_website" text,
    "social_blog" text,
    "summary" text,
    "reasons" text,
    "projects" text,
    "skills" text,
    "public_reasons" boolean,
    "public_projects" boolean,
    "public_skills" boolean,
    "public_member" boolean,
    "display_name" text,
    "social_linkedin" text
      );


alter table "public"."profile" enable row level security;


  create table "public"."scholarships" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "recipient_user_id" uuid not null,
    "reviewed_by_user_id" uuid,
    "reviewed_at" timestamp with time zone,
    "approved" boolean,
    "notes" text,
    "expire_at" timestamp with time zone
      );


alter table "public"."scholarships" enable row level security;


  create table "public"."users" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "email" text not null default ''::text,
    "first_name" text not null,
    "last_name" text not null,
    "last_login" timestamp with time zone not null default now(),
    "username" text not null,
    "middle_name" text,
    "role" roles not null
      );


alter table "public"."users" enable row level security;

CREATE UNIQUE INDEX profile_pkey ON public.profile USING btree (user_id);

CREATE UNIQUE INDEX profile_user_id_key ON public.profile USING btree (user_id);

CREATE UNIQUE INDEX scholarships_pkey ON public.scholarships USING btree (id);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."profile" add constraint "profile_pkey" PRIMARY KEY using index "profile_pkey";

alter table "public"."scholarships" add constraint "scholarships_pkey" PRIMARY KEY using index "scholarships_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."profile" add constraint "profile_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."profile" validate constraint "profile_user_id_fkey";

alter table "public"."profile" add constraint "profile_user_id_key" UNIQUE using index "profile_user_id_key";

alter table "public"."scholarships" add constraint "scholarships_recipient_user_id_fkey" FOREIGN KEY (recipient_user_id) REFERENCES users(id) ON DELETE SET DEFAULT not valid;

alter table "public"."scholarships" validate constraint "scholarships_recipient_user_id_fkey";

alter table "public"."scholarships" add constraint "scholarships_reviewed_by_user_id_fkey" FOREIGN KEY (reviewed_by_user_id) REFERENCES users(id) not valid;

alter table "public"."scholarships" validate constraint "scholarships_reviewed_by_user_id_fkey";

grant delete on table "public"."profile" to "anon";

grant insert on table "public"."profile" to "anon";

grant references on table "public"."profile" to "anon";

grant select on table "public"."profile" to "anon";

grant trigger on table "public"."profile" to "anon";

grant truncate on table "public"."profile" to "anon";

grant update on table "public"."profile" to "anon";

grant delete on table "public"."profile" to "authenticated";

grant insert on table "public"."profile" to "authenticated";

grant references on table "public"."profile" to "authenticated";

grant select on table "public"."profile" to "authenticated";

grant trigger on table "public"."profile" to "authenticated";

grant truncate on table "public"."profile" to "authenticated";

grant update on table "public"."profile" to "authenticated";

grant delete on table "public"."profile" to "service_role";

grant insert on table "public"."profile" to "service_role";

grant references on table "public"."profile" to "service_role";

grant select on table "public"."profile" to "service_role";

grant trigger on table "public"."profile" to "service_role";

grant truncate on table "public"."profile" to "service_role";

grant update on table "public"."profile" to "service_role";

grant delete on table "public"."scholarships" to "anon";

grant insert on table "public"."scholarships" to "anon";

grant references on table "public"."scholarships" to "anon";

grant select on table "public"."scholarships" to "anon";

grant trigger on table "public"."scholarships" to "anon";

grant truncate on table "public"."scholarships" to "anon";

grant update on table "public"."scholarships" to "anon";

grant delete on table "public"."scholarships" to "authenticated";

grant insert on table "public"."scholarships" to "authenticated";

grant references on table "public"."scholarships" to "authenticated";

grant select on table "public"."scholarships" to "authenticated";

grant trigger on table "public"."scholarships" to "authenticated";

grant truncate on table "public"."scholarships" to "authenticated";

grant update on table "public"."scholarships" to "authenticated";

grant delete on table "public"."scholarships" to "service_role";

grant insert on table "public"."scholarships" to "service_role";

grant references on table "public"."scholarships" to "service_role";

grant select on table "public"."scholarships" to "service_role";

grant trigger on table "public"."scholarships" to "service_role";

grant truncate on table "public"."scholarships" to "service_role";

grant update on table "public"."scholarships" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";


  create policy "public_test"
  on "public"."profile"
  as permissive
  for select
  to public
using (true);



