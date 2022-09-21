## Bugs

- Redirect from google not passing the HOC's auth check on initial redirect. Basically, the router.push() happens before the User object gets defined.

**the env file expects**
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_API_KEY
NEXT_PUBLIC_ORIGIN = http://localhost:3000/
