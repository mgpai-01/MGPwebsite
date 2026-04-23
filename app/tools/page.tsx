export const metadata = {
  title: 'Agent Tools Dashboard | MGP',
  robots: { index: false, follow: false },
}

const skills = [
  // ── Design Quality (pbakaus/impeccable) ──────────────────────────────────
  {
    name: 'polish',
    source: 'pbakaus/impeccable',
    tag: 'Design Quality',
    tagColor: '#2a6b40',
    description: 'Final quality pass fixing alignment, spacing, consistency, and micro-detail issues before shipping.',
    trigger: 'polish, finishing touches, pre-launch review, something looks off, good to great',
  },
  {
    name: 'impeccable',
    source: 'pbakaus/impeccable',
    tag: 'Design Quality',
    tagColor: '#2a6b40',
    description: 'Full design quality meta-skill. Runs shape → build → polish pipeline. Use for full feature builds.',
    trigger: 'build a feature, craft, teach, extract design system',
  },
  {
    name: 'audit',
    source: 'pbakaus/impeccable',
    tag: 'Design Quality',
    tagColor: '#2a6b40',
    description: 'Technical quality checks across accessibility, performance, theming, and responsive design. Scored P0–P3 report.',
    trigger: 'accessibility check, performance audit, technical quality review',
  },
  {
    name: 'critique',
    source: 'pbakaus/impeccable',
    tag: 'Design Quality',
    tagColor: '#2a6b40',
    description: 'UX evaluation: visual hierarchy, information architecture, cognitive load, emotional resonance with quantitative scoring.',
    trigger: 'review, critique, evaluate, give feedback on a design',
  },
  {
    name: 'shape',
    source: 'pbakaus/impeccable',
    tag: 'Design Quality',
    tagColor: '#2a6b40',
    description: 'Plan UX/UI for a feature before coding. Structured discovery interview → design brief.',
    trigger: 'plan a feature, design brief, UX strategy before coding',
  },
  {
    name: 'adapt',
    source: 'pbakaus/impeccable',
    tag: 'Design Quality',
    tagColor: '#2a6b40',
    description: 'Adapt designs across screen sizes, devices, and platforms. Implements breakpoints and fluid layouts.',
    trigger: 'responsive design, mobile layouts, breakpoints, cross-device',
  },
  {
    name: 'animate',
    source: 'pbakaus/impeccable',
    tag: 'Design Quality',
    tagColor: '#2a6b40',
    description: 'Add purposeful animations, micro-interactions, and motion effects that improve usability.',
    trigger: 'animations, transitions, micro-interactions, motion, hover effects',
  },
  {
    name: 'layout',
    source: 'pbakaus/impeccable',
    tag: 'Design Quality',
    tagColor: '#2a6b40',
    description: 'Improve layout, spacing, and visual rhythm. Fixes monotonous grids and weak visual hierarchy.',
    trigger: 'layout feeling off, spacing issues, visual hierarchy, crowded UI',
  },
  {
    name: 'typeset',
    source: 'pbakaus/impeccable',
    tag: 'Design Quality',
    tagColor: '#2a6b40',
    description: 'Improve typography: font choices, hierarchy, sizing, weight, and readability.',
    trigger: 'fonts, type, readability, text hierarchy, sizing looks off',
  },
  {
    name: 'colorize',
    source: 'pbakaus/impeccable',
    tag: 'Design Quality',
    tagColor: '#2a6b40',
    description: 'Add strategic color to monochromatic or dull sections, making interfaces more engaging.',
    trigger: 'design looks gray, dull, lacks warmth, needs more color',
  },
  {
    name: 'bolder',
    source: 'pbakaus/impeccable',
    tag: 'Design Quality',
    tagColor: '#2a6b40',
    description: 'Amplify safe or boring designs for more visual impact and character.',
    trigger: 'bland, generic, too safe, lacks personality, more visual impact',
  },
  {
    name: 'distill',
    source: 'pbakaus/impeccable',
    tag: 'Design Quality',
    tagColor: '#2a6b40',
    description: 'Strip designs to their essence by removing unnecessary complexity.',
    trigger: 'simplify, declutter, reduce noise, remove elements, cleaner UI',
  },
  {
    name: 'quieter',
    source: 'pbakaus/impeccable',
    tag: 'Design Quality',
    tagColor: '#2a6b40',
    description: 'Tone down visually aggressive or overstimulating designs.',
    trigger: 'too bold, too loud, overwhelming, aggressive, calmer aesthetic',
  },
  {
    name: 'clarify',
    source: 'pbakaus/impeccable',
    tag: 'Design Quality',
    tagColor: '#2a6b40',
    description: 'Improve unclear UX copy, error messages, microcopy, and labels.',
    trigger: 'confusing text, unclear labels, bad error messages, better UX writing',
  },
  {
    name: 'delight',
    source: 'pbakaus/impeccable',
    tag: 'Design Quality',
    tagColor: '#2a6b40',
    description: 'Add moments of joy, personality, and unexpected touches that make interfaces memorable.',
    trigger: 'add polish, personality, fun, memorable, delight',
  },
  {
    name: 'harden',
    source: 'pbakaus/impeccable',
    tag: 'Design Quality',
    tagColor: '#2a6b40',
    description: 'Make interfaces production-ready: error handling, empty states, edge cases, i18n, text overflow.',
    trigger: 'harden, production-ready, edge cases, error states, empty states',
  },
  {
    name: 'optimize',
    source: 'pbakaus/impeccable',
    tag: 'Design Quality',
    tagColor: '#2a6b40',
    description: 'Diagnose and fix UI performance: loading speed, rendering, animations, bundle size.',
    trigger: 'slow, laggy, janky, performance, bundle size, faster experience',
  },
  {
    name: 'overdrive',
    source: 'pbakaus/impeccable',
    tag: 'Design Quality',
    tagColor: '#2a6b40',
    description: 'Push interfaces past conventional limits — shaders, spring physics, scroll-driven reveals, 60fps.',
    trigger: 'wow, impress, go all-out, extraordinary, technically ambitious',
  },

  // ── Frontend & Framework ────────────────────────────────────────────────
  {
    name: 'frontend-design',
    source: 'anthropics/skills',
    tag: 'Frontend',
    tagColor: '#1a56a0',
    description: 'Production-grade frontend with high design quality. Avoids generic AI aesthetics.',
    trigger: 'build web components, pages, landing pages, dashboards, React components',
  },
  {
    name: 'shadcn',
    source: 'shadcn/ui',
    tag: 'Frontend',
    tagColor: '#1a56a0',
    description: 'Manage shadcn/ui components — adding, searching, fixing, styling, and composing UI.',
    trigger: 'shadcn, components.json, shadcn init, component registry',
  },
  {
    name: 'web-design-guidelines',
    source: 'vercel-labs/agent-skills',
    tag: 'Frontend',
    tagColor: '#1a56a0',
    description: 'Review UI code against Web Interface Guidelines for accessibility, UX, and best practices.',
    trigger: 'review my UI, check accessibility, audit design, review UX',
  },
  {
    name: 'vercel-react-best-practices',
    source: 'vercel-labs/agent-skills',
    tag: 'Frontend',
    tagColor: '#1a56a0',
    description: 'Next.js/React performance optimization guidelines from Vercel Engineering.',
    trigger: 'React components, Next.js pages, data fetching, bundle optimization',
  },
  {
    name: 'vercel-composition-patterns',
    source: 'vercel-labs/agent-skills',
    tag: 'Frontend',
    tagColor: '#1a56a0',
    description: 'React composition patterns: compound components, render props, context providers.',
    trigger: 'component architecture, boolean prop proliferation, compound components',
  },
  {
    name: 'vercel-react-view-transitions',
    source: 'vercel-labs/agent-skills',
    tag: 'Frontend',
    tagColor: '#1a56a0',
    description: 'React View Transition API — page transitions, route animations, shared element transitions.',
    trigger: 'page transitions, route animations, ViewTransition, startViewTransition',
  },
  {
    name: 'vercel-react-native-skills',
    source: 'vercel-labs/agent-skills',
    tag: 'Frontend',
    tagColor: '#1a56a0',
    description: 'React Native and Expo best practices for performant mobile apps.',
    trigger: 'React Native, Expo, mobile, native platform APIs',
  },

  // ── Visual / Creative ───────────────────────────────────────────────────
  {
    name: 'canvas-design',
    source: 'anthropics/skills',
    tag: 'Visual',
    tagColor: '#7b3fa0',
    description: 'Create visual art as .png and .pdf using design philosophy and 30+ bundled fonts.',
    trigger: 'poster, piece of art, design, static visual asset',
  },
  {
    name: 'brand-guidelines',
    source: 'anthropics/skills',
    tag: 'Visual',
    tagColor: '#7b3fa0',
    description: 'Apply brand colors, typography, and design standards to any artifact.',
    trigger: 'brand colors, style guidelines, visual formatting, design standards',
  },
  {
    name: 'theme-factory',
    source: 'anthropics/skills',
    tag: 'Visual',
    tagColor: '#7b3fa0',
    description: '10 pre-built themes (arctic-frost, botanical-garden, forest-canopy…) + custom theme generation.',
    trigger: 'apply a theme, style this, theme a document or page',
  },

  // ── Deployment ──────────────────────────────────────────────────────────
  {
    name: 'deploy-to-vercel',
    source: 'vercel-labs/agent-skills',
    tag: 'Deployment',
    tagColor: '#b45309',
    description: 'Deploy applications to Vercel, create preview deployments.',
    trigger: 'deploy my app, push this live, preview deployment',
  },
  {
    name: 'vercel-cli-with-tokens',
    source: 'vercel-labs/agent-skills',
    tag: 'Deployment',
    tagColor: '#b45309',
    description: 'Vercel CLI with token-based authentication — deploy, set env vars, manage projects.',
    trigger: 'deploy to vercel, set up vercel, add environment variables',
  },

  // ── Productivity ────────────────────────────────────────────────────────
  {
    name: 'webapp-testing',
    source: 'anthropics/skills',
    tag: 'Testing',
    tagColor: '#0f7173',
    description: 'Playwright browser automation: test functionality, capture screenshots, debug UI, read logs.',
    trigger: 'test the site, take a screenshot, check if this works in browser',
  },
  {
    name: 'pdf',
    source: 'anthropics/skills',
    tag: 'Docs',
    tagColor: '#6b5344',
    description: 'Read, create, merge, split, rotate, watermark, OCR, fill forms, encrypt PDFs.',
    trigger: 'any .pdf file, create a PDF, extract from PDF',
  },
]

const tagOrder = ['Design Quality', 'Frontend', 'Visual', 'Deployment', 'Testing', 'Docs']

export default function ToolsPage() {
  const grouped = tagOrder.map((tag) => ({
    tag,
    color: skills.find((s) => s.tag === tag)?.tagColor ?? '#555',
    skills: skills.filter((s) => s.tag === tag),
  }))

  return (
    <div style={{ backgroundColor: '#faf9f6', minHeight: '100vh', padding: '80px 40px 120px' }}>
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '64px', borderBottom: '1px solid #ece8e0', paddingBottom: '40px' }}>
          <p
            className="font-condensed font-bold uppercase"
            style={{ fontSize: '12px', letterSpacing: '0.16em', color: '#6a9e78', marginBottom: '8px' }}
          >
            Internal
          </p>
          <h1
            className="font-condensed font-black"
            style={{ fontSize: 'clamp(34px, 4vw, 56px)', lineHeight: '1.05', color: '#1c2b1e', marginBottom: '12px' }}
          >
            Agent Tools Dashboard
          </h1>
          <p
            className="font-sans"
            style={{ fontSize: '16px', color: '#6b7b6e', lineHeight: '1.7', fontWeight: 300, maxWidth: '600px', margin: 0 }}
          >
            {skills.length} skills installed across {tagOrder.length} categories. All are always active — Claude
            applies them automatically based on context. Add skills with{' '}
            <code style={{ fontFamily: 'monospace', fontSize: '13px', backgroundColor: '#ece8e0', padding: '2px 6px', borderRadius: '4px' }}>
              npx skills add owner/repo/path
            </code>
          </p>
        </div>

        {/* Grouped Sections */}
        {grouped.map(({ tag, color, skills: groupSkills }) => (
          <div key={tag} style={{ marginBottom: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <span
                className="font-condensed font-bold uppercase"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  color: '#fff',
                  backgroundColor: color,
                  padding: '4px 12px',
                  borderRadius: '100px',
                }}
              >
                {tag}
              </span>
              <span className="font-sans" style={{ fontSize: '13px', color: '#6b7b6e' }}>
                {groupSkills.length} skill{groupSkills.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '16px',
              }}
            >
              {groupSkills.map((skill) => (
                <SkillCard key={skill.name} skill={skill} color={color} />
              ))}
            </div>
          </div>
        ))}

        {/* Footer note */}
        <div
          style={{
            borderTop: '1px solid #ece8e0',
            paddingTop: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <p className="font-sans" style={{ fontSize: '13px', color: '#6b7b6e', margin: 0, fontWeight: 300 }}>
            Skills stored in <code style={{ fontFamily: 'monospace', fontSize: '12px' }}>.agents/skills/</code> ·{' '}
            Update with <code style={{ fontFamily: 'monospace', fontSize: '12px' }}>npx skills update</code>
          </p>
          <p className="font-condensed font-bold uppercase" style={{ fontSize: '11px', color: '#6b7b6e', margin: 0, letterSpacing: '0.1em' }}>
            MGP Internal · Not indexed
          </p>
        </div>
      </div>
    </div>
  )
}

function SkillCard({ skill, color }: { skill: typeof skills[0]; color: string }) {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '14px',
        border: '1px solid #ece8e0',
        padding: '22px 24px',
        boxShadow: '0 2px 12px rgba(0,0,0,.04)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
        <h3
          className="font-condensed font-black"
          style={{ fontSize: '19px', color: '#1c2b1e', margin: 0 }}
        >
          {skill.name}
        </h3>
        <span
          className="font-condensed font-bold"
          style={{
            fontSize: '11px',
            color: color,
            backgroundColor: `${color}14`,
            padding: '3px 9px',
            borderRadius: '100px',
            flexShrink: 0,
            marginLeft: '8px',
          }}
        >
          {skill.tag}
        </span>
      </div>

      <p
        className="font-sans"
        style={{ fontSize: '13.5px', color: '#3d5442', lineHeight: '1.6', marginBottom: '12px', fontWeight: 300 }}
      >
        {skill.description}
      </p>

      <div style={{ borderTop: '1px solid #f0ede6', paddingTop: '10px' }}>
        <p className="font-sans" style={{ fontSize: '11.5px', color: '#6b7b6e', margin: 0, lineHeight: '1.5' }}>
          <span style={{ fontWeight: 500, color: '#1c2b1e' }}>Triggers: </span>
          {skill.trigger}
        </p>
        <p className="font-sans" style={{ fontSize: '11px', color: '#a0a8a2', margin: '4px 0 0', fontFamily: 'monospace' }}>
          {skill.source}
        </p>
      </div>
    </div>
  )
}
