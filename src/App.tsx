import { useState, useEffect, useRef } from 'react'
import cert1 from '@/imports/WhatsApp_Image_2026-08-18_at_19.13.31.jpeg'
import cert2 from '@/imports/WhatsApp_Image_2026-08-18_at_19.13.32.jpeg'

const NAV = ['Profil', 'Kemampuan', 'Pengalaman', 'Sertifikat', 'Pendidikan', 'Kontak']

const CERTIFICATES = [
  {
    src: cert1,
    title: 'Desktop Application Training',
    subtitle: 'Professional Level',
    issuer: 'Ebiz Education Enterprise · Microsoft Partner',
    date: '15 Maret 2024',
    score: 'Grade C+ · Mean 70',
    tags: ['Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint'],
    color: '#3178c6',
  },
  {
    src: cert2,
    title: 'Diploma in Digital Forensic Investigation',
    subtitle: 'CPD Certified',
    issuer: 'Alison · Empower Yourself',
    date: '2024',
    score: 'Skor 88%',
    tags: ['Digital Forensics', 'Cybersecurity', 'Investigation'],
    color: '#00c4a0',
  },
]

const SKILLS_TECH = [
  { name: 'HTML & CSS', level: 90, color: '#e34f26' },
  { name: 'JavaScript', level: 80, color: '#f7df1e' },
  { name: 'TypeScript', level: 65, color: '#3178c6' },
  { name: 'PHP', level: 75, color: '#8892be' },
  { name: 'Python', level: 60, color: '#3776ab' },
  { name: 'MySQL', level: 78, color: '#00758f' },
  { name: 'React', level: 70, color: '#61dafb' },
  { name: 'Node.js', level: 62, color: '#68a063' },
]

const SKILLS_SOFT = [
  'Web Programming',
  'Fullstack Development',
  'UI/UX Design',
  'Database Management',
  'Audit Data',
  'Teamwork',
  'Problem Solving',
]

const EXPERIENCES = [
  {
    role: 'UI/UX Designer',
    company: 'Freelance / Project',
    year: '2023 – Sekarang',
    desc: 'Merancang tampilan web yang menarik dan intuitif, membangun antarmuka front-end menggunakan berbagai bahasa pemrograman dan framework modern.',
    tags: ['Figma', 'HTML/CSS', 'JavaScript', 'React'],
  },
  {
    role: 'Audit Data',
    company: 'Perusahaan Tiga Serangkai',
    year: '2024',
    desc: 'Mengaudit dan memvalidasi data pada dashboard admin perusahaan, memastikan integritas dan akurasi data operasional.',
    tags: ['Data Analysis', 'MySQL', 'Dashboard', 'Reporting'],
  },
]

const EDUCATION = [
  {
    school: 'Universitas Tiga Serangkai',
    major: 'Sistem Informasi',
    year: '2023 – Aktif (Semester 7)',
    icon: '🎓',
    active: true,
  },
  {
    school: 'Madrasah Aliyah Darul Hidayaah',
    major: 'Jurusan IPS',
    year: '2019 – 2022',
    icon: '📚',
    active: false,
  },
]

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const { ref, visible } = useInView()
  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono-custom text-sm font-medium" style={{ color }}>{name}</span>
        <span className="font-mono-custom text-xs" style={{ color: '#6b7a94' }}>{level}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: visible ? `${level}%` : '0%',
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            transitionDelay: `${delay}ms`,
            boxShadow: visible ? `0 0 8px ${color}66` : 'none',
          }}
        />
      </div>
    </div>
  )
}

function Section({ id, children, className = '' }: { id: string; children: React.ReactNode; className?: string }) {
  const { ref, visible } = useInView()
  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </section>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <span className="font-mono-custom text-xs tracking-widest uppercase" style={{ color: '#00ffb3' }}>
        {children}
      </span>
      <div className="flex-1 h-px" style={{ background: 'rgba(0,255,179,0.15)' }} />
    </div>
  )
}

function CertModal({ cert, onClose }: { cert: typeof CERTIFICATES[0]; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full rounded-2xl overflow-hidden"
        style={{ border: '1px solid rgba(0,255,179,0.2)', boxShadow: '0 0 60px rgba(0,0,0,0.6)' }}
        onClick={e => e.stopPropagation()}
      >
        <img src={cert.src} alt={cert.title} className="w-full h-auto block" />
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all hover:scale-110"
          style={{ background: 'rgba(0,0,0,0.7)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export default function App() {
  const [activeCert, setActiveCert] = useState<typeof CERTIFICATES[0] | null>(null)
  const [activeNav, setActiveNav] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [typed, setTyped] = useState('')
  const titles = ['IT Developer', 'UI/UX Designer', 'Fullstack Dev']
  const titleIdx = useRef(0)
  const charIdx = useRef(0)
  const deleting = useRef(false)

  useEffect(() => {
    const tick = () => {
      const current = titles[titleIdx.current]
      if (!deleting.current) {
        setTyped(current.slice(0, charIdx.current + 1))
        charIdx.current++
        if (charIdx.current === current.length) {
          deleting.current = true
          setTimeout(tick, 1400)
          return
        }
      } else {
        setTyped(current.slice(0, charIdx.current - 1))
        charIdx.current--
        if (charIdx.current === 0) {
          deleting.current = false
          titleIdx.current = (titleIdx.current + 1) % titles.length
        }
      }
      setTimeout(tick, deleting.current ? 55 : 90)
    }
    const t = setTimeout(tick, 600)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV.map(n => document.getElementById(n.toLowerCase()))
      const scrollY = window.scrollY + 120
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i]
        if (el && el.offsetTop <= scrollY) {
          setActiveNav(NAV[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div className="min-h-screen grid-bg" style={{ background: '#070b14' }}>
      {/* scan line effect */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: 'linear-gradient(to bottom, transparent 60%, rgba(0,255,179,0.015) 100%)',
        }}
      />

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16"
        style={{ background: 'rgba(7,11,20,0.88)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,255,179,0.08)' }}
      >
        <span className="font-display font-bold text-lg tracking-tight" style={{ color: '#00ffb3' }}>
          RSP<span style={{ color: '#e8edf5' }}>.</span>
        </span>
        {/* desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV.map(n => (
            <button
              key={n}
              onClick={() => scrollTo(n)}
              className="font-mono-custom text-xs tracking-widest uppercase transition-colors duration-200"
              style={{ color: activeNav === n ? '#00ffb3' : '#6b7a94' }}
            >
              {n}
            </button>
          ))}
        </div>
        {/* mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(v => !v)}
        >
          {[0,1,2].map(i => (
            <span key={i} className="block w-5 h-0.5 transition-all" style={{ background: '#00ffb3' }} />
          ))}
        </button>
      </nav>

      {/* mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{ background: 'rgba(7,11,20,0.97)' }}
        >
          {NAV.map(n => (
            <button
              key={n}
              onClick={() => scrollTo(n)}
              className="font-display font-bold text-2xl uppercase tracking-widest"
              style={{ color: '#e8edf5' }}
            >
              {n}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <div
        id="profil"
        className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-28 pt-16"
      >
        {/* corner decoration */}
        <div
          className="absolute top-24 right-8 md:right-20 w-48 h-48 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: '#00ffb3' }}
        />
        <div
          className="absolute bottom-32 left-4 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: '#3178c6' }}
        />

        <div className="max-w-5xl mx-auto w-full grid md:grid-cols-5 gap-12 items-center">
          {/* text side */}
          <div className="md:col-span-3 animate-fade-up">
            <p className="font-mono-custom text-xs tracking-widest uppercase mb-4 animate-fade-up delay-100" style={{ color: '#00ffb3' }}>
              &gt; Selamat datang di portfolio saya
            </p>
            <h1 className="font-display font-black text-5xl md:text-7xl leading-none mb-4 animate-fade-up delay-200" style={{ color: '#e8edf5' }}>
              RHENDY<br />
              <span style={{ color: '#00ffb3' }}>SETYAWAN</span>
            </h1>
            <h2 className="font-display font-light text-2xl md:text-3xl mb-6 animate-fade-up delay-300" style={{ color: '#e8edf5' }}>
              Pambudi
            </h2>
            <div className="flex items-center gap-2 mb-8 animate-fade-up delay-400" style={{ color: '#6b7a94' }}>
              <span className="font-mono-custom text-base md:text-xl" style={{ color: '#00ffb3' }}>{typed}</span>
              <span className="cursor-blink font-mono-custom text-xl" style={{ color: '#00ffb3' }}>|</span>
            </div>
            <p className="font-display text-base md:text-lg leading-relaxed mb-10 max-w-xl animate-fade-up delay-500" style={{ color: '#8a96aa' }}>
              Mahasiswa aktif semester 7 jurusan Sistem Informasi di Universitas Tiga Serangkai.
              Bersemangat dalam pengembangan IT, UI/UX design, dan membangun solusi digital yang berdampak.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up delay-500">
              <button
                onClick={() => scrollTo('Kontak')}
                className="font-display font-semibold px-7 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                style={{
                  background: '#00ffb3',
                  color: '#070b14',
                  boxShadow: '0 0 24px rgba(0,255,179,0.3)',
                }}
              >
                Hubungi Saya
              </button>
              <button
                onClick={() => scrollTo('Pengalaman')}
                className="font-display font-semibold px-7 py-3 rounded-lg border transition-all duration-300 hover:bg-white/5"
                style={{ borderColor: 'rgba(0,255,179,0.3)', color: '#e8edf5' }}
              >
                Lihat Pengalaman
              </button>
            </div>
          </div>

          {/* avatar side */}
          <div className="md:col-span-2 flex justify-center md:justify-end animate-fade-up delay-300">
            <div className="relative">
              <div
                className="w-52 h-52 md:w-64 md:h-64 rounded-2xl overflow-hidden glow-border relative"
                style={{ border: '2px solid rgba(0,255,179,0.3)' }}
              >
                <div
                  className="absolute inset-0 z-10"
                  style={{ background: 'linear-gradient(135deg, rgba(0,255,179,0.1) 0%, transparent 60%)' }}
                />
                <div
                  className="w-full h-full flex items-center justify-center font-display font-black text-7xl"
                  style={{ background: 'linear-gradient(135deg, #0d1424, #111927)', color: '#00ffb3' }}
                >
                  RS
                </div>
              </div>
              {/* badge */}
              <div
                className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl font-mono-custom text-xs font-bold"
                style={{ background: '#111927', border: '1px solid rgba(0,255,179,0.2)', color: '#00ffb3' }}
              >
                &lt;Aktif /&gt;
              </div>
            </div>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="font-mono-custom text-xs" style={{ color: '#6b7a94' }}>scroll</span>
          <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, #6b7a94, transparent)' }} />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-5xl mx-auto px-6 md:px-16 lg:px-0 pb-24 space-y-32">

        {/* KEMAMPUAN */}
        <Section id="kemampuan">
          <SectionLabel>01 / Kemampuan</SectionLabel>
          <div className="grid md:grid-cols-2 gap-12">
            {/* programming languages */}
            <div>
              <h3 className="font-display font-bold text-xl mb-8" style={{ color: '#e8edf5' }}>
                Bahasa Pemrograman &amp; Teknologi
              </h3>
              <div className="space-y-5">
                {SKILLS_TECH.map((s, i) => (
                  <SkillBar key={s.name} {...s} delay={i * 80} />
                ))}
              </div>
            </div>

            {/* soft skills */}
            <div>
              <h3 className="font-display font-bold text-xl mb-8" style={{ color: '#e8edf5' }}>
                Keahlian Lainnya
              </h3>
              <div className="flex flex-wrap gap-3">
                {SKILLS_SOFT.map(s => (
                  <span
                    key={s}
                    className="font-mono-custom text-sm px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 cursor-default"
                    style={{
                      background: 'rgba(0,255,179,0.06)',
                      border: '1px solid rgba(0,255,179,0.18)',
                      color: '#00ffb3',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* stats */}
              <div className="mt-10 grid grid-cols-2 gap-4">
                {[
                  { num: '7', label: 'Semester Aktif' },
                  { num: '8+', label: 'Teknologi Dikuasai' },
                  { num: '2+', label: 'Pengalaman' },
                  { num: '∞', label: 'Semangat Belajar' },
                ].map(st => (
                  <div
                    key={st.label}
                    className="p-4 rounded-xl text-center"
                    style={{ background: '#0d1424', border: '1px solid rgba(0,255,179,0.08)' }}
                  >
                    <p className="font-display font-black text-3xl" style={{ color: '#00ffb3' }}>{st.num}</p>
                    <p className="font-mono-custom text-xs mt-1" style={{ color: '#6b7a94' }}>{st.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* PENGALAMAN */}
        <Section id="pengalaman">
          <SectionLabel>02 / Pengalaman</SectionLabel>
          <div className="space-y-6">
            {EXPERIENCES.map((exp, i) => (
              <div
                key={i}
                className="group relative p-6 md:p-8 rounded-2xl transition-all duration-300 hover:translate-y-[-2px]"
                style={{
                  background: '#0d1424',
                  border: '1px solid rgba(0,255,179,0.08)',
                  boxShadow: '0 4px 32px rgba(0,0,0,0.3)',
                }}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, rgba(0,255,179,0.03), transparent)' }}
                />
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-display font-bold text-xl" style={{ color: '#e8edf5' }}>{exp.role}</h3>
                    <p className="font-display text-sm mt-1" style={{ color: '#00ffb3' }}>{exp.company}</p>
                  </div>
                  <span
                    className="font-mono-custom text-xs px-3 py-1.5 rounded-lg self-start whitespace-nowrap"
                    style={{ background: 'rgba(0,255,179,0.06)', border: '1px solid rgba(0,255,179,0.15)', color: '#6b7a94' }}
                  >
                    {exp.year}
                  </span>
                </div>
                <p className="font-display text-sm leading-relaxed mb-5" style={{ color: '#8a96aa' }}>{exp.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map(t => (
                    <span
                      key={t}
                      className="font-mono-custom text-xs px-3 py-1 rounded"
                      style={{ background: 'rgba(255,255,255,0.04)', color: '#6b7a94', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* SERTIFIKAT */}
        <Section id="sertifikat">
          <SectionLabel>03 / Sertifikat</SectionLabel>
          <div className="grid sm:grid-cols-2 gap-6">
            {CERTIFICATES.map((cert, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                style={{ background: '#0d1424', border: '1px solid rgba(0,255,179,0.08)' }}
                onClick={() => setActiveCert(cert)}
              >
                {/* thumbnail */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <img
                    src={cert.src}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ background: 'rgba(7,11,20,0.7)' }}
                  >
                    <span
                      className="font-mono-custom text-sm px-4 py-2 rounded-lg"
                      style={{ background: '#00ffb3', color: '#070b14', fontWeight: 700 }}
                    >
                      Lihat Sertifikat
                    </span>
                  </div>
                  {/* score badge */}
                  <div
                    className="absolute top-3 right-3 font-mono-custom text-xs px-2.5 py-1 rounded-lg font-bold"
                    style={{ background: 'rgba(0,0,0,0.7)', color: cert.color, border: `1px solid ${cert.color}44` }}
                  >
                    {cert.score}
                  </div>
                </div>
                {/* info */}
                <div className="p-5">
                  <p className="font-mono-custom text-xs mb-1" style={{ color: '#6b7a94' }}>{cert.date}</p>
                  <h3 className="font-display font-bold text-base leading-snug mb-1" style={{ color: '#e8edf5' }}>
                    {cert.title}
                  </h3>
                  <p className="font-display text-xs mb-4" style={{ color: cert.color }}>{cert.issuer}</p>
                  <div className="flex flex-wrap gap-2">
                    {cert.tags.map(t => (
                      <span
                        key={t}
                        className="font-mono-custom text-xs px-2.5 py-1 rounded"
                        style={{ background: 'rgba(255,255,255,0.04)', color: '#6b7a94', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* PENDIDIKAN */}
        <Section id="pendidikan">
          <SectionLabel>04 / Pendidikan</SectionLabel>
          <div className="relative">
            {/* timeline line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(to bottom, rgba(0,255,179,0.3), rgba(0,255,179,0.05))' }}
            />
            <div className="space-y-8 pl-16">
              {EDUCATION.map((edu, i) => (
                <div key={i} className="relative">
                  {/* dot */}
                  <div
                    className="absolute -left-10 top-5 w-3 h-3 rounded-full"
                    style={{
                      background: edu.active ? '#00ffb3' : '#1e2a3d',
                      border: `2px solid ${edu.active ? '#00ffb3' : 'rgba(0,255,179,0.2)'}`,
                      boxShadow: edu.active ? '0 0 12px rgba(0,255,179,0.5)' : 'none',
                    }}
                  />
                  <div
                    className="p-6 rounded-xl"
                    style={{
                      background: '#0d1424',
                      border: `1px solid ${edu.active ? 'rgba(0,255,179,0.2)' : 'rgba(0,255,179,0.06)'}`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <p className="font-mono-custom text-xs uppercase tracking-widest mb-1" style={{ color: '#6b7a94' }}>
                          {edu.year}
                        </p>
                        <h3 className="font-display font-bold text-lg" style={{ color: '#e8edf5' }}>{edu.school}</h3>
                        <p className="font-display text-sm mt-1" style={{ color: '#00ffb3' }}>{edu.major}</p>
                      </div>
                      {edu.active && (
                        <span
                          className="font-mono-custom text-xs px-3 py-1 rounded-full"
                          style={{ background: 'rgba(0,255,179,0.1)', color: '#00ffb3', border: '1px solid rgba(0,255,179,0.2)' }}
                        >
                          Aktif
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* KONTAK */}
        <Section id="kontak">
          <SectionLabel>05 / Kontak</SectionLabel>
          <div
            className="relative p-8 md:p-12 rounded-2xl overflow-hidden"
            style={{ background: '#0d1424', border: '1px solid rgba(0,255,179,0.1)' }}
          >
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
              style={{ background: '#00ffb3' }}
            />
            <h3 className="font-display font-black text-3xl md:text-4xl mb-3" style={{ color: '#e8edf5' }}>
              Mari Berkolaborasi
            </h3>
            <p className="font-display text-base mb-10" style={{ color: '#8a96aa' }}>
              Terbuka untuk proyek freelance, magang, dan peluang kerja sama lainnya.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: '📞', label: 'Telepon', value: '085642070738', href: 'tel:085642070738' },
                { icon: '✉️', label: 'Email', value: 'rhendys53@gmail.com', href: 'mailto:rhendys53@gmail.com' },
                { icon: '📍', label: 'Lokasi', value: 'Bulakrejo, Sukoharjo', href: '#' },
                { icon: '🌐', label: 'Website', value: 'www.reallygreatsite.com', href: '#' },
              ].map(c => (
                <a
                  key={c.label}
                  href={c.href}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] group"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,255,179,0.06)' }}
                >
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <p className="font-mono-custom text-xs uppercase tracking-widest mb-0.5" style={{ color: '#6b7a94' }}>{c.label}</p>
                    <p className="font-display text-sm group-hover:text-[#00ffb3] transition-colors" style={{ color: '#e8edf5' }}>{c.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </Section>
      </div>

      {activeCert && <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />}

      {/* FOOTER */}
      <footer
        className="text-center py-8 font-mono-custom text-xs"
        style={{ color: '#2d3a50', borderTop: '1px solid rgba(0,255,179,0.04)' }}
      >
        © 2026 Rhendy Setyawan Pambudi — Sistem Informasi
      </footer>
    </div>
  )
}
