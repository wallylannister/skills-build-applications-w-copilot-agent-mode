// Vite environment variables must be defined with the VITE_ prefix.
// Example: create octofit-tracker/frontend/.env.local with VITE_CODESPACE_NAME=<your-codespace-name>
const rawCodespaceName = import.meta.env.VITE_CODESPACE_NAME
const codespaceName = typeof rawCodespaceName === 'string' ? rawCodespaceName.trim() : ''

export const backendHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function buildApiUrl(component: string, path = ''): string {
  const normalizedPath = path ? `/${path.replace(/^\/+/, '')}` : ''
  return `${backendHost}/api/${component}${normalizedPath}`
}

export function normalizeApiResponse<T = any>(payload: unknown, component: string): T[] {
  if (Array.isArray(payload)) {
    return payload as T[]
  }

  if (payload && typeof payload === 'object') {
    const record = payload as Record<string, unknown>
    const singular = component.endsWith('s') ? component.slice(0, -1) : component
    const candidates = [component, singular, 'data', 'items', 'results']

    for (const candidate of candidates) {
      const value = record[candidate]
      if (Array.isArray(value)) {
        return value as T[]
      }
    }

    const firstArray = Object.values(record).find(Array.isArray)
    if (Array.isArray(firstArray)) {
      return firstArray as T[]
    }
  }

  return []
}

export function getCodespaceNotice(): string {
  return codespaceName
    ? `Using Codespaces backend host ${backendHost}`
    : 'VITE_CODESPACE_NAME is not defined. Falling back to http://localhost:8000 for local development.'
}
