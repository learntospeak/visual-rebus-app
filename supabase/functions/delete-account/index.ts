import { createClient } from 'npm:@supabase/supabase-js@2'

const allowedOrigins = new Set([
  'https://cluecanvas.games',
  'https://www.cluecanvas.games',
  'http://localhost',
  'https://localhost',
  'capacitor://localhost',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
])

function corsHeaders(request: Request) {
  const origin = request.headers.get('Origin') ?? ''
  const isLocalDevelopment = /^http:\/\/(?:localhost|127\.0\.0\.1):\d+$/.test(origin)
  return {
    'Access-Control-Allow-Origin': allowedOrigins.has(origin) || isLocalDevelopment ? origin : 'https://cluecanvas.games',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
    'Vary': 'Origin',
  }
}

function json(request: Request, status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), { status, headers: corsHeaders(request) })
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders(request) })
  if (request.method !== 'POST') return json(request, 405, { error: 'Method not allowed.' })

  const authorization = request.headers.get('Authorization')
  if (!authorization?.startsWith('Bearer ')) return json(request, 401, { error: 'Sign in before deleting your account.' })

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const publishableKey = Deno.env.get('SUPABASE_ANON_KEY')
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !publishableKey || !serviceRoleKey) {
    console.error('The delete-account function is missing required Supabase environment variables.')
    return json(request, 500, { error: 'Account deletion is temporarily unavailable.' })
  }

  const accessToken = authorization.slice('Bearer '.length)
  const userClient = createClient(supabaseUrl, publishableKey, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: { headers: { Authorization: authorization } },
  })
  const { data: { user }, error: userError } = await userClient.auth.getUser(accessToken)
  if (userError || !user) return json(request, 401, { error: 'Your session has expired. Sign in again and retry.' })

  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
  const { error: deletionError } = await adminClient.auth.admin.deleteUser(user.id)
  if (deletionError) {
    console.error('Unable to delete Clue Canvas account.', { userId: user.id, error: deletionError.message })
    return json(request, 500, { error: 'We could not delete the account. Please try again or contact support.' })
  }

  return json(request, 200, { deleted: true })
})
