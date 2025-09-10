
function generate_types() {
    npx supabase gen types typescript --project-id $1 --schema public > database.types.ts
}

function pull_db_from_remote() {
    npx supabase db pull && npx supabase migration up
}