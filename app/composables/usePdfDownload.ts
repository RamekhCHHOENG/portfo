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
        <div style="width:232px;flex-shrink:0;background:#0f0f1a;color:#fff;padding:36px 24px;display:flex;flex-direction:column;gap:22px;">

          <!-- Name + title -->
          <div>
            <div style="width:58px;height:58px;border-radius:14px;background:linear-gradient(135deg,#7c3aed,#4f46e5);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#fff;margin-bottom:12px;letter-spacing:-0.5px;">RC</div>
            <h1 style="margin:0 0 2px;font-size:17px;font-weight:800;color:#fff;letter-spacing:-0.3px;line-height:1.2;">Ramekh Chhoeng</h1>
            <p style="margin:0;font-size:10.5px;color:#a78bfa;font-weight:600;letter-spacing:1px;text-transform:uppercase;">Full-Stack Developer</p>
          </div>

          <!-- Contact -->
          <div>
            <p style="margin:0 0 8px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,0.3);">Contact</p>
            <div style="display:flex;flex-direction:column;gap:7px;">
              <div style="display:flex;align-items:flex-start;gap:8px;">
                <span style="color:#a78bfa;font-size:11px;flex-shrink:0;">✉</span>
                <span style="font-size:10px;color:rgba(255,255,255,0.7);word-break:break-all;line-height:1.4;">ramekhchhoeng@icloud.com</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px;">
                <span style="color:#a78bfa;font-size:11px;flex-shrink:0;">☎</span>
                <span style="font-size:10px;color:rgba(255,255,255,0.7);">+855 97 818 818 3</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px;">
                <span style="color:#a78bfa;font-size:11px;flex-shrink:0;">⌂</span>
                <span style="font-size:10px;color:rgba(255,255,255,0.7);">Phnom Penh, Cambodia</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px;">
                <span style="color:#a78bfa;font-size:10px;flex-shrink:0;">◆</span>
                <span style="font-size:10px;color:rgba(255,255,255,0.7);">github.com/RamekhCHHOENG</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px;">
                <span style="color:#a78bfa;font-size:10px;flex-shrink:0;">in</span>
                <span style="font-size:10px;color:rgba(255,255,255,0.7);">linkedin.com/in/ramekhchhoeng</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px;">
                <span style="color:#a78bfa;font-size:10px;flex-shrink:0;">↗</span>
                <span style="font-size:10px;color:rgba(255,255,255,0.7);">ramekhchhoeng.github.io/portfo</span>
              </div>
            </div>
          </div>

          <!-- Skills -->
          <div>
            <p style="margin:0 0 8px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,0.3);">Skills</p>
            ${[
              { label: 'Languages', items: 'TypeScript · JavaScript · Swift · Java · Kotlin · Python · SQL' },
              { label: 'Frontend', items: 'Vue · Nuxt · Vuetify · React · Next.js · Bootstrap · jQuery · GraphQL · Tailwind CSS' },
              { label: 'Backend', items: 'NestJS · Hono · Express · Spring Boot · Laravel · PHP · Prisma' },
              { label: 'Mobile', items: 'React Native · Expo · Swift (iOS) · Java (Android)' },
              { label: 'Database', items: 'PostgreSQL · MySQL · Oracle · Redis' },
              { label: 'DevOps & Infra', items: 'Docker · RabbitMQ · MinIO · Coolify · GitHub Actions · Linux' },
              { label: 'Tools', items: 'Figma · Jira · Postman · VS Code · GitHub' },
            ].map(g => `
              <div style="margin-bottom:9px;">
                <p style="margin:0 0 3px;font-size:9px;font-weight:700;color:#a78bfa;text-transform:uppercase;letter-spacing:0.8px;">${g.label}</p>
                <p style="margin:0;font-size:10px;color:rgba(255,255,255,0.6);line-height:1.5;">${g.items}</p>
              </div>
            `).join('')}
          </div>

          <!-- Soft Skills -->
          <div>
            <p style="margin:0 0 8px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,0.3);">Soft Skills</p>
            <div style="display:flex;flex-direction:column;gap:4px;">
              ${['Fast Learner','Problem Solving','Teamwork','Communication','Works Under Pressure'].map(s =>
                `<div style="display:flex;align-items:center;gap:6px;">
                  <span style="width:4px;height:4px;border-radius:50%;background:#7c3aed;flex-shrink:0;"></span>
                  <span style="font-size:10.5px;color:rgba(255,255,255,0.7);">${s}</span>
                </div>`
              ).join('')}
            </div>
          </div>

          <!-- Languages spoken -->
          <div>
            <p style="margin:0 0 8px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,0.3);">Languages</p>
            ${[['Khmer','Native'],['English','Intermediate']].map(([lang, level]) => `
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <span style="font-size:11px;color:rgba(255,255,255,0.8);font-weight:500;">${lang}</span>
                <span style="font-size:10px;color:#a78bfa;font-weight:600;">${level}</span>
              </div>
            `).join('')}
          </div>

          <!-- Hobbies -->
          <div>
            <p style="margin:0 0 8px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,0.3);">Interests</p>
            <div style="display:flex;flex-direction:column;gap:4px;">
              ${['Reading','Researching new tech','Watching movies','Listening to music'].map(h =>
                `<div style="display:flex;align-items:center;gap:6px;">
                  <span style="width:4px;height:4px;border-radius:50%;background:#7c3aed;flex-shrink:0;"></span>
                  <span style="font-size:10.5px;color:rgba(255,255,255,0.6);">${h}</span>
                </div>`
              ).join('')}
            </div>
          </div>

          <!-- Education -->
          <div>
            <p style="margin:0 0 8px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,0.3);">Education</p>
            ${[
              { degree: 'B.Sc. Computer Science', school: 'TechVision University', location: 'Phnom Penh', period: '2019 – 2021' },
              { degree: 'Associate Degree · IT', school: 'Digital Bridges Institute', location: 'Phnom Penh', period: '2017 – 2019' },
              { degree: 'Baccalaureate II', school: 'Sunrise High School', location: 'Siem Reap', period: '2014 – 2017' },
            ].map(e => `
              <div style="margin-bottom:10px;">
                <p style="margin:0 0 1px;font-size:11px;font-weight:700;color:#fff;line-height:1.3;">${e.degree}</p>
                <p style="margin:0 0 1px;font-size:10px;color:#a78bfa;">${e.school}</p>
                <p style="margin:0;font-size:9.5px;color:rgba(255,255,255,0.4);">${e.location} · ${e.period}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- ── MAIN BODY ── -->
        <div style="flex:1;min-width:0;background:#fff;padding:36px 34px;">

          <!-- Summary -->
          <div style="margin-bottom:22px;padding:16px 18px;background:#f8f6ff;border-left:3px solid #7c3aed;border-radius:0 8px 8px 0;">
            <p style="margin:0;font-size:11.5px;color:#3b3057;line-height:1.7;">
              Frontend-led full-stack engineer with <strong>4.5+ years</strong> designing and building production web and mobile applications.
              Deep expertise in Vue/Nuxt ecosystems, grown into full-stack — shipping REST &amp; GraphQL APIs, microservices,
              and cross-platform iOS/Android apps. Known for clean UI, typed contracts, and strong team collaboration.
            </p>
          </div>

          <!-- Experience -->
          <div style="margin-bottom:22px;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
              <h2 style="margin:0;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:#7c3aed;">Experience</h2>
              <div style="flex:1;height:1px;background:#ede9fe;"></div>
            </div>

            <!-- Job 1 -->
            <div style="margin-bottom:16px;padding-left:12px;border-left:2px solid #ede9fe;page-break-inside:avoid;">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1px;">
                <div>
                  <span style="font-size:13.5px;font-weight:800;color:#0f0f1a;">Frontend Engineer Lead</span>
                  <span style="font-size:11px;color:#7c3aed;font-weight:600;margin-left:8px;">· InnoVex Solutions Ltd</span>
                </div>
                <span style="font-size:10px;color:#888;white-space:nowrap;margin-left:8px;background:#f4f4f8;padding:2px 8px;border-radius:99px;font-weight:600;">Dec 2022 – Present</span>
              </div>
              <p style="margin:0 0 8px;font-size:10px;color:#888;font-style:italic;">Phnom Penh · Management &amp; Business Technology</p>
              <div style="display:flex;flex-direction:column;gap:4px;margin-bottom:8px;">
                ${[
                  'Established the core project infrastructure and frontend architecture from the ground up.',
                  'Built and launched a production web application using Vue.js + TypeScript with Vuetify component library.',
                  'Contributed to UI/UX design and maintained a shared component design system.',
                  'Performed bug fixing, code reviews, and ongoing maintenance across the platform.',
                  'Led a small frontend team, mentoring junior developers on best practices.',
                ].map(p => `<div style="display:flex;align-items:flex-start;gap:6px;font-size:11px;color:#444;line-height:1.55;">${dot}<span>${p}</span></div>`).join('')}
              </div>
              <div style="display:flex;flex-wrap:wrap;gap:4px;">${['Vue.js','TypeScript','Vuetify','GraphQL','Jira','GitHub'].map(pill).join('')}</div>
            </div>

            <!-- Job 2 -->
            <div style="margin-bottom:16px;padding-left:12px;border-left:2px solid #ede9fe;page-break-inside:avoid;">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1px;">
                <div>
                  <span style="font-size:13.5px;font-weight:800;color:#0f0f1a;">Software Developer</span>
                  <span style="font-size:11px;color:#7c3aed;font-weight:600;margin-left:8px;">· BlockNova Digital Co., Ltd</span>
                </div>
                <span style="font-size:10px;color:#888;white-space:nowrap;margin-left:8px;background:#f4f4f8;padding:2px 8px;border-radius:99px;font-weight:600;">Jan 2020 – Dec 2022</span>
              </div>
              <p style="margin:0 0 8px;font-size:10px;color:#888;font-style:italic;">Phnom Penh · Enterprise Software &amp; Product Solutions</p>
              <div style="display:flex;flex-direction:column;gap:4px;margin-bottom:8px;">
                ${[
                  'Contributed to and shipped 3 full production projects using Vue.js for enterprise, university, and government clients.',
                  'Collaborated with the team to develop and implement frontend features based on business requirements.',
                  'Implemented custom reusable components and maintained a consistent UI across projects.',
                  'Addressed complex bugs across projects to ensure smooth and reliable functionality.',
                  'Enhanced and improved both internal tools and client-facing products over time.',
                ].map(p => `<div style="display:flex;align-items:flex-start;gap:6px;font-size:11px;color:#444;line-height:1.55;">${dot}<span>${p}</span></div>`).join('')}
              </div>
              <div style="display:flex;flex-wrap:wrap;gap:4px;">${['Vue.js','JavaScript','Bootstrap','jQuery','MySQL','PHP'].map(pill).join('')}</div>
            </div>

            <!-- Job 3 -->
            <div style="padding-left:12px;border-left:2px solid #ede9fe;page-break-inside:avoid;">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1px;">
                <div>
                  <span style="font-size:13.5px;font-weight:800;color:#0f0f1a;">iOS Developer</span>
                  <span style="font-size:11px;color:#7c3aed;font-weight:600;margin-left:8px;">· SwiftLab Studio</span>
                </div>
                <span style="font-size:10px;color:#888;white-space:nowrap;margin-left:8px;background:#f4f4f8;padding:2px 8px;border-radius:99px;font-weight:600;">Sep 2019 – Jan 2020</span>
              </div>
              <p style="margin:0 0 8px;font-size:10px;color:#888;font-style:italic;">Phnom Penh · Mobile Application</p>
              <div style="display:flex;flex-direction:column;gap:4px;margin-bottom:8px;">
                ${[
                  'Played a key role in developing and implementing a product feature set using Swift (programmatic UI).',
                  'Participated in bug fixing activities to improve overall product quality.',
                  'Conducted ongoing maintenance to ensure the product continued to meet business requirements.',
                ].map(p => `<div style="display:flex;align-items:flex-start;gap:6px;font-size:11px;color:#444;line-height:1.55;">${dot}<span>${p}</span></div>`).join('')}
              </div>
              <div style="display:flex;flex-wrap:wrap;gap:4px;">${['Swift','iOS','Xcode','Git'].map(pill).join('')}</div>
            </div>
          </div>

          <!-- Projects -->
          <div>
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
              <h2 style="margin:0;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:2px;color:#7c3aed;">Featured Projects</h2>
              <div style="flex:1;height:1px;background:#ede9fe;"></div>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
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
                  desc: 'Personal portfolio — Nuxt 4, Tailwind v4, PWA-ready with liquid glass design system.',
                  tech: ['Nuxt 4','Vue 3','TypeScript'],
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
                <div style="background:#faf9ff;border:1px solid #ede9fe;border-radius:8px;padding:11px 13px;page-break-inside:avoid;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                    <span style="font-size:12px;font-weight:800;color:#0f0f1a;">${p.title}</span>
                    <span style="font-size:9px;color:#a78bfa;font-weight:700;background:#f0edff;padding:1px 7px;border-radius:99px;">${p.year}</span>
                  </div>
                  <p style="margin:0 0 7px;font-size:10px;color:#555;line-height:1.5;">${p.desc}</p>
                  <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px;">${p.tech.map(pill).join('')}</div>
                  <span style="font-size:9px;color:#7c3aed;font-weight:600;">↗ ${p.link}</span>
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
        pagebreak: { mode: 'css' },
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
