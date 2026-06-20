import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import bundledData from '../data/siteContent.json'

const STORAGE_KEY = 'portfolioData'

function addIds(data) {
  const arrayKeys = ['skills', 'languages', 'work', 'education', 'projects', 'certificates']
  const result = { ...data }
  arrayKeys.forEach(key => {
    if (Array.isArray(result[key])) {
      result[key] = result[key].map(item => ({
        ...item,
        _id: item._id ?? crypto.randomUUID(),
      }))
    }
  })
  if (result.profile?.links) {
    result.profile = {
      ...result.profile,
      links: result.profile.links.map(l => ({ ...l, _id: l._id ?? crypto.randomUUID() })),
    }
  }
  if (result.about?.paragraphs) {
    result.about = {
      ...result.about,
      paragraphs: result.about.paragraphs.map((p, i) => ({ text: p, _id: crypto.randomUUID() })),
    }
  }
  return result
}

function stripIds(data) {
  const arrayKeys = ['skills', 'languages', 'work', 'education', 'projects', 'certificates']
  const result = { ...data }
  arrayKeys.forEach(key => {
    if (Array.isArray(result[key])) {
      result[key] = result[key].map(({ _id, ...item }) => item)
    }
  })
  if (result.profile?.links) {
    result.profile = {
      ...result.profile,
      links: result.profile.links.map(({ _id, ...l }) => l),
    }
  }
  if (result.about?.paragraphs) {
    result.about = {
      ...result.about,
      paragraphs: result.about.paragraphs.map(p => (typeof p === 'string' ? p : p.text)),
    }
  }
  return result
}

function loadInitial() {
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    const base = s ? { ...bundledData, ...JSON.parse(s) } : bundledData
    return addIds(base)
  } catch {
    return addIds(bundledData)
  }
}

const AdminContext = createContext(null)

export function AdminProvider({ children }) {
  const [data, setData] = useState(loadInitial)

  // Auto-save to localStorage whenever data changes (strips _id fields first)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stripIds(data)))
    } catch {}
  }, [data])

  const exportJSON = useCallback(() => {
    const clean = stripIds(data)
    const blob = new Blob([JSON.stringify(clean, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'siteContent.json'
    a.click()
    URL.revokeObjectURL(url)
  }, [data])

  const resetToSource = useCallback(() => {
    if (window.confirm('Reset all data to the original source file? Your edits will be lost.')) {
      localStorage.removeItem(STORAGE_KEY)
      window.location.reload()
    }
  }, [])

  const viewPortfolio = useCallback(() => {
    window.location.href = window.location.origin + window.location.pathname
  }, [])

  return (
    <AdminContext.Provider value={{ data, setData, exportJSON, resetToSource, viewPortfolio }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used inside AdminProvider')
  return ctx
}
