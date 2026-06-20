import { useState } from 'react'
import { AdminProvider, useAdmin } from './AdminContext'
import './admin.css'

import ProfileSection     from './sections/ProfileSection'
import WorkSection        from './sections/WorkSection'
import EducationSection   from './sections/EducationSection'
import SkillsSection      from './sections/SkillsSection'
import ProjectsSection    from './sections/ProjectsSection'
import CertificatesSection from './sections/CertificatesSection'
import ContactSection     from './sections/ContactSection'

const TABS = [
  { id: 'profile',      label: 'Profile',      Component: ProfileSection },
  { id: 'work',         label: 'Work',          Component: WorkSection },
  { id: 'education',    label: 'Education',     Component: EducationSection },
  { id: 'skills',       label: 'Skills',        Component: SkillsSection },
  { id: 'projects',     label: 'Projects',      Component: ProjectsSection },
  { id: 'certificates', label: 'Certificates',  Component: CertificatesSection },
  { id: 'contact',      label: 'Contact',       Component: ContactSection },
]

function AdminLayout() {
  const [activeTab, setActiveTab] = useState('profile')
  const { exportJSON, resetToSource, viewPortfolio } = useAdmin()

  const { Component } = TABS.find(t => t.id === activeTab)

  return (
    <div className="adm-shell">
      <header className="adm-header">
        <span className="adm-header__title">Portfolio Admin</span>
        <button type="button" className="adm-btn adm-btn--ghost" onClick={viewPortfolio}>
          View Portfolio →
        </button>
      </header>

      <div className="adm-body">
        <nav className="adm-sidebar">
          {TABS.map(t => (
            <button
              key={t.id}
              type="button"
              className={`adm-nav-btn${activeTab === t.id ? ' adm-nav-btn--active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <main className="adm-main">
          <Component />
        </main>
      </div>

      <footer className="adm-footer">
        <span className="adm-footer__hint">Changes are auto-saved to your browser.</span>
        <div className="adm-footer__actions">
          <button type="button" className="adm-btn adm-btn--ghost" onClick={resetToSource}>
            Reset to Source
          </button>
          <button type="button" className="adm-btn adm-btn--primary" onClick={exportJSON}>
            Export JSON
          </button>
        </div>
      </footer>
    </div>
  )
}

export default function AdminApp() {
  return (
    <AdminProvider>
      <AdminLayout />
    </AdminProvider>
  )
}
