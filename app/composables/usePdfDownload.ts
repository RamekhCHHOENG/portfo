export function usePdfDownload() {
  const isGenerating = ref(false)

  function buildResumeHTML(): HTMLElement {
    const root = document.createElement('div')
    root.style.cssText = 'width:794px;background:#fff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;font-size:13px;color:#1e1e2e;line-height:1.5;display:flex;flex-direction:column;'

    const pill = (text: string) =>
      `<span style="display:inline-block;background:#ede9fe;color:#5b21b6;font-size:9.5px;font-weight:700;padding:2px 9px;border-radius:99px;letter-spacing:0.3px;">${text}</span>`

    const dot = `<span style="display:inline-block;width:5px;height:5px;border-radius:50%;background:#7c3aed;margin-right:7px;flex-shrink:0;margin-top:5px;"></span>`

    root.innerHTML = `
      <div style="display:flex;min-height:1123px;">

        <!-- ── SIDEBAR ── -->
        <div style="width:232px;flex-shrink:0;background:#0f0f1a;color:#fff;padding:40px 26px;display:flex;flex-direction:column;gap:28px;">

          <!-- Name + title -->
          <div>
            <div style="width:62px;height:62px;border-radius:14px;background:linear-gradient(135deg,#7c3aed,#4f46e5);display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;color:#fff;margin-bottom:14px;letter-spacing:-0.5px;">RC</div>
            <h1 style="margin:0 0 4px;font-size:18px;font-weight:800;color:#fff;letter-spacing:-0.3px;line-height:1.2;">Ramekhchhoeng</h1>
            <p style="margin:0;font-size:11px;color:#a78bfa;font-weight:600;letter-spacing:1px;text-transform:uppercase;">Full-Stack Developer</p>
          </div>

          <!-- Contact -->
          <div>
            <p style="margin:0 0 10px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,0.3);">Contact</p>
            <div style="display:flex;flex-direction:column;gap:8px;">
              <div style="display:flex;align-items:flex-start;gap:8px;">
                <span style="color:#a78bfa;font-size:11px;flex-shrink:0;margin-top:0px;">✉</span>
                <span style="font-size:10.5px;color:rgba(255,255,255,0.7);word-break:break-all;line-height:1.4;">ramekhchhoeng@icloud.com</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px;">
                <span style="color:#a78bfa;font-size:11px;flex-shrink:0;">⌂</span>
                <span style="font-size:10.5px;color:rgba(255,255,255,0.7);">Phnom Penh, Cambodia</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px;">
                <span style="color:#a78bfa;font-size:11px;flex-shrink:0;">◆</span>
                <span style="font-size:10px;color:rgba(255,255,255,0.7);">github.com/RamekhCHHOENG</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px;">
                <span style="color:#a78bfa;font-size:11px;flex-shrink:0;">in</span>
                <span style="font-size:10px;color:rgba(255,255,255,0.7);">linkedin.com/in/ramekhchhoeng</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px;">
                <span style="color:#a78bfa;font-size:11px;flex-shrink:0;">↗</span>
                <span style="font-size:10px;color:rgba(255,255,255,0.7);">ramekhchhoeng.github.io/portfo</span>
              </div>
            </div>
          </div>

          <!-- Skills -->
          <div>
            <p style="margin:0 0 10px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,0.3);">Skills</p>
            ${[
              { label: 'Languages', items: 'TypeScript · JavaScript · Python · Java · SQL · Rust' },
              { label: 'Backend', items: 'NestJS · Hono · FastAPI · Express · Spring Boot · Prisma · Bun' },
              { label: 'Frontend', items: 'Next.js · Nuxt · React · Vue · Tailwind CSS · shadcn/ui' },
              { label: 'Mobile', items: 'React Native · Expo' },
              { label: 'DevOps & Infra', items: 'Docker · PostgreSQL · Redis · RabbitMQ · MinIO · Coolify · GitHub Actions' },
              { label: 'Tools', items: 'Figma · Postman · VS Code · Raycast' },
            ].map(g => `
              <div style="margin-bottom:11px;">
                <p style="margin:0 0 4px;font-size:9.5px;font-weight:700;color:#a78bfa;text-transform:uppercase;letter-spacing:0.8px;">${g.label}</p>
                <p style="margin:0;font-size:10.5px;color:rgba(255,255,255,0.6);line-height:1.55;">${g.items}</p>
              </div>
            `).join('')}
          </div>

          <!-- Languages spoken -->
          <div>
            <p style="margin:0 0 10px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,0.3);">Languages</p>
            ${[['Khmer','Native'],['English','Professional']].map(([lang, level]) => `
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:7px;">
                <span style="font-size:11px;color:rgba(255,255,255,0.8);font-weight:500;">${lang}</span>
                <span style="font-size:10px;color:#a78bfa;font-weight:600;">${level}</span>
              </div>
            `).join('')}
          </div>

          <!-- Education -->
          <div>
            <p style="margin:0 0 10px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,0.3);">Education</p>
            <p style="margin:0 0 2px;font-size:11.5px;font-weight:700;color:#fff;">Computer Science</p>
            <p style="margin:0 0 4px;font-size:10px;color:#a78bfa;">Self-directed · 2019 – Present</p>
            <p style="margin:0;font-size:10px;color:rgba(255,255,255,0.5);line-height:1.5;">Real-world projects, open-source contributions, online courses.</p>
          </div>
        </div>

        <!-- ── MAIN BODY ── -->
        <div style="flex:1;min-width:0;background:#fff;padding:40px 38px;">

          <!-- Summary -->
          <div style="margin-bottom:26px;padding:18px 20px;background:#f8f6ff;border-left:3px solid #7c3aed;border-radius:0 8px 8px 0;">
            <p style="margin:0;font-size:12px;color:#3b3057;line-height:1.7;">
              Backend-focused full-stack engineer with <strong>4+ years</strong> shipping production REST &amp; GraphQL APIs, 
              mobile apps, and self-hosted microservice infrastructure for clients across 
              <strong>Southeast Asia and Europe</strong>. I care about clean architecture, typed contracts, 
              and code that's genuinely maintainable.
            </p>
          </div>

          <!-- Experience -->
          <div style="margin-bottom:26px;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
              <h2 style="margin:0;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:#7c3aed;">Experience</h2>
              <div style="flex:1;height:1px;background:#ede9fe;"></div>
            </div>

            <!-- Job 1 -->
            <div style="margin-bottom:20px;padding-left:14px;border-left:2px solid #ede9fe;">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:2px;">
                <div>
                  <span style="font-size:14px;font-weight:800;color:#0f0f1a;">Full-Stack Developer</span>
                  <span style="font-size:11.5px;color:#7c3aed;font-weight:600;margin-left:8px;">· Self-employed</span>
                </div>
                <span style="font-size:10.5px;color:#888;white-space:nowrap;margin-left:8px;background:#f4f4f8;padding:2px 8px;border-radius:99px;font-weight:600;">2021 – Present</span>
              </div>
              <p style="margin:0 0 10px;font-size:10.5px;color:#888;font-style:italic;">Remote · Southeast Asia &amp; Europe</p>
              <div style="display:flex;flex-direction:column;gap:5px;margin-bottom:10px;">
                ${[
                  'Built production-grade web apps and REST/GraphQL APIs for clients across Southeast Asia and Europe.',
                  'Architected microservices with Docker, RabbitMQ, and PostgreSQL — deployed via Coolify on self-hosted infrastructure.',
                  'Developed cross-platform mobile apps with React Native &amp; Expo, published to both App Store and Google Play.',
                  'Mentored junior developers and led code reviews to maintain quality across concurrent projects.',
                ].map(p => `<div style="display:flex;align-items:flex-start;gap:7px;font-size:11.5px;color:#444;line-height:1.55;">${dot}<span>${p}</span></div>`).join('')}
              </div>
              <div style="display:flex;flex-wrap:wrap;gap:5px;">${['TypeScript','NestJS','Hono','Nuxt','React Native','Docker','PostgreSQL','RabbitMQ'].map(pill).join('')}</div>
            </div>

            <!-- Job 2 -->
            <div style="padding-left:14px;border-left:2px solid #ede9fe;">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:2px;">
                <div>
                  <span style="font-size:14px;font-weight:800;color:#0f0f1a;">Web Developer</span>
                  <span style="font-size:11.5px;color:#7c3aed;font-weight:600;margin-left:8px;">· Freelance</span>
                </div>
                <span style="font-size:10.5px;color:#888;white-space:nowrap;margin-left:8px;background:#f4f4f8;padding:2px 8px;border-radius:99px;font-weight:600;">2019 – 2021</span>
              </div>
              <p style="margin:0 0 10px;font-size:10.5px;color:#888;font-style:italic;">Cambodia · Local businesses</p>
              <div style="display:flex;flex-direction:column;gap:5px;margin-bottom:10px;">
                ${[
                  'Delivered responsive marketing sites and landing pages for local businesses in Cambodia.',
                  'Progressed from static HTML/CSS to full-stack Vue + Node.js applications in two years.',
                  'Integrated third-party APIs including payments, maps, and CMS systems into client projects.',
                ].map(p => `<div style="display:flex;align-items:flex-start;gap:7px;font-size:11.5px;color:#444;line-height:1.55;">${dot}<span>${p}</span></div>`).join('')}
              </div>
              <div style="display:flex;flex-wrap:wrap;gap:5px;">${['Vue','JavaScript','Node.js','Tailwind CSS','MySQL'].map(pill).join('')}</div>
            </div>
          </div>

          <!-- Projects -->
          <div>
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
              <h2 style="margin:0;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:#7c3aed;">Featured Projects</h2>
              <div style="flex:1;height:1px;background:#ede9fe;"></div>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
              ${[
                {
                  title: 'Mini Bank API',
                  year: '2024',
                  desc: 'Banking REST API with JWT auth, account management, and transactions. Containerized with Docker.',
                  tech: ['Kotlin','Spring Boot','PostgreSQL','Docker'],
                  link: 'github.com/RamekhCHHOENG/kotlin-spring-mini-bank',
                },
                {
                  title: 'Todo App',
                  year: '2023',
                  desc: 'Full-stack task manager — Next.js 13 frontend + TypeScript API. Real-time updates, deployed on Vercel.',
                  tech: ['Next.js','TypeScript','REST API'],
                  link: 'github.com/RamekhCHHOENG/todo-nextjs-typescript',
                },
                {
                  title: 'Portfolio',
                  year: '2026',
                  desc: 'This site — Nuxt 4, Tailwind v4, PWA-ready with macOS Tahoe liquid glass design.',
                  tech: ['Nuxt 4','Vue 3','TypeScript','NuxtUI'],
                  link: 'ramekhchhoeng.github.io/portfo',
                },
                {
                  title: 'Todo API',
                  year: '2023',
                  desc: 'Standalone TypeScript REST API — clean architecture, typed request/response, full CRUD.',
                  tech: ['TypeScript','Express','Node.js'],
                  link: 'github.com/RamekhCHHOENG/todo-api-typescript',
                },
              ].map(p => `
                <div style="background:#faf9ff;border:1px solid #ede9fe;border-radius:8px;padding:13px 14px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;">
                    <span style="font-size:12.5px;font-weight:800;color:#0f0f1a;">${p.title}</span>
                    <span style="font-size:9.5px;color:#a78bfa;font-weight:700;background:#f0edff;padding:1px 7px;border-radius:99px;">${p.year}</span>
                  </div>
                  <p style="margin:0 0 8px;font-size:10.5px;color:#555;line-height:1.55;">${p.desc}</p>
                  <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:7px;">${p.tech.map(pill).join('')}</div>
                  <span style="font-size:9.5px;color:#7c3aed;font-weight:600;">↗ ${p.link}</span>
                </div>
              `).join('')}
            </div>
          </div>

        </div>
      </div>
    `
    return root
  }

  async function downloadPDF() {
    if (import.meta.server) return
    if (isGenerating.value) return
    isGenerating.value = true

    try {
      const html2pdf = (await import('html2pdf.js')).default

      const resumeEl = buildResumeHTML()

      const wrapper = document.createElement('div')
      wrapper.style.cssText = 'position:fixed;top:0;left:0;width:794px;height:0;overflow:hidden;z-index:-9999;pointer-events:none;'
      wrapper.appendChild(resumeEl)
      document.body.appendChild(wrapper)

      await new Promise(resolve => requestAnimationFrame(resolve))

      const opt = {
        margin: 0,
        filename: 'Ramekhchhoeng_Final.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false,
          width: 794,
          height: resumeEl.scrollHeight,
          windowWidth: 794,
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      }

      await html2pdf().set(opt).from(resumeEl).save()
      document.body.removeChild(wrapper)
    } catch (err) {
      console.error('PDF generation failed:', err)
    } finally {
      isGenerating.value = false
    }
  }

  return { downloadPDF, isGenerating }
}
