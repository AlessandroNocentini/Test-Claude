import bundledData from './siteContent.json'

const STORAGE_KEY = 'portfolioData'

function loadData() {
  try {
    const s = typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY)
    if (s) return { ...bundledData, ...JSON.parse(s) }
  } catch {}
  return bundledData
}

const data = loadData()

function formatDate(str) {
  if (!str || str === 'Present') return str
  const [year, month] = str.split('-')
  if (!month) return year
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${months[parseInt(month, 10) - 1]} ${year}`
}

export const personal = {
  name: data.profile.name,
  headline: data.profile.headline,
  title: data.profile.headline.split('|')[0].trim(),
  location: data.profile.location,
  bio: data.about.paragraphs,
  email: data.contacts.email,
  cvUrl: data.cv.url,
  cvTitle: data.cv.title,
  avatarUrl: '/assets/avatar.jpg',
  github: data.profile.links.find(l => l.label === 'GitHub')?.url ?? '',
  linkedin: data.profile.links.find(l => l.label === 'Linkedin')?.url ?? '',
  instagram: data.profile.links.find(l => l.label === 'Instagram')?.url ?? '',
}

// Group skills by category, preserving order of first appearance
export const skills = Object.values(
  data.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = { category: skill.category, items: [] }
    acc[skill.category].items.push({ name: skill.name, level: skill.level })
    return acc
  }, {})
)

export const languages = data.languages

export const experience = data.work.map((job, i) => ({
  id: i + 1,
  role: job.role,
  company: job.company,
  period: `${formatDate(job.start)} — ${formatDate(job.end)}`,
  domain: job.domain,
  description: job.description,
  bullets: job.bullets ?? [],
  links: (job.links ?? []).map(url => ({ label: 'Visit', url })),
}))

export const education = data.education.map((edu, i) => ({
  id: i + 1,
  degree: edu.degree,
  field: edu.field,
  institution: edu.institution,
  period: `${edu.start} — ${edu.end}`,
  thesis: edu.thesis ?? null,
  description: edu.description ?? '',
  links: edu.links ?? [],
}))

const LEVEL_PCT = { Expert: 100, Advanced: 75, Intermediate: 50, Beginner: 25, 'Native speaker': 100, Proficient: 75 }
const LEVEL_CLASS = { Expert: 'lvl-expert', Advanced: 'lvl-advanced', Intermediate: 'lvl-intermediate', Beginner: 'lvl-beginner', 'Native speaker': 'lvl-expert', Proficient: 'lvl-advanced' }

export const skillsFlat = [
  ...data.skills.map(s => ({ name: s.name, level: s.level, pct: LEVEL_PCT[s.level] ?? 50, cls: LEVEL_CLASS[s.level] ?? '' })),
  ...data.languages.map(l => ({ name: l.name, level: l.level, pct: LEVEL_PCT[l.level] ?? 50, cls: LEVEL_CLASS[l.level] ?? '' })),
].sort((a, b) => b.pct - a.pct)

export const projects = data.projects.map((p, i) => ({
  id: i + 1,
  name: p.name,
  kind: p.kind,
  type: p.type,
  description: p.shortDescription || p.description || '',
  longDescription: p.longDescription || '',
  images: p.images ?? { thumbnail: '', gallery: [] },
  technologies: p.technologies ?? [],
  links: p.links ?? [],
  paper: p.paper ?? null,
}))

export const certifications = data.certificates.map((c, i) => ({
  id: i + 1,
  name: c.name,
  issuer: c.issuer,
  date: c.year,
  credentialUrl: c.url ?? '',
}))
