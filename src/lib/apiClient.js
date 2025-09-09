import { store } from '@/store'

export async function apiFetch(path, options = {}) {
  const state = store.getState()
  const token = state?.auth?.accessToken
  const headers = new Headers(options.headers || {})
  if (token) headers.set('Authorization', `Bearer ${token}`)
  headers.set('Content-Type', 'application/json')

  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'https://reecetan.softvencefsd.xyz/api'}${path}`, {
    ...options,
    headers,
  })

  if (!res.ok) {
    const message = await safeJson(res)
    const error = new Error(message?.error || res.statusText)
    error.status = res.status
    throw error
  }

  return safeJson(res)
}

async function safeJson(res) {
  try { return await res.json() } catch { return null }
}


