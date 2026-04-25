export function usePdfDownload() {
  const isGenerating = ref(false)

  function buildResumeHTML(): HTMLElement {
    const el = document.createElement('div')
    el.style.cssText = `
      width: 794px;
      min-height: 1123px;
      background: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
      font-size: 13px;
      color: #1a1a1a;
      line-height: 1.5;
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    `

    el.innerHTML = `
      <!-- Header bar -->
      <div style="background:#0f0f18; padding:40px 52px 36px; color:#fff;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:24px;">
          <div>
            <h1 style="margin:0 0 4px; font-size:32px; font-weight:700; letter-spacing:-0.5px; color:#fff;">Ramekhchhoeng</h1>
            <p style="margin:0 0 16px; font-size:15px; color:#a78bfa; font-weight:500; letter-spacing:0.3px;">Full-Stack Developer</p>
            <p style="margin:0; font-size:12px; color:rgba(255,255,255,0.55); max-width:420px; line-height:1.6;">
              Backend-focused engineer with 4+ years shipping production APIs, mobile apps, and self-hosted infrastructure for clients across Southeast Asia and Europe.
            </p>
          </div>
          <div style="text-align:right; flex-shrink:0; margin-top:4px;">
            <div style="display:flex; flex-direction:column; gap:6px; align-items:flex-end;">
              <a href="mailto:ramekhchhoeng@icloud.com" style="color:rgba(255,255,255,0.65); font-size:11.5px; text-decoration:none;">ramekhchhoeng@icloud.com</a>
              <a href="https://github.com/RamekhCHHOENG" style="color:rgba(255,255,255,0.65); font-size:11.5px; text-decoration:none;">github.com/RamekhCHHOENG</a>
              <a href="https://linkedin.com/in/ramekhchhoeng" style="color:rgba(255,255,255,0.65); font-size:11.5px; text-decoration:none;">linkedin.com/in/ramekhchhoeng</a>
              <span style="color:rgba(255,255,255,0.45); font-size:11.5px;">📍 Phnom Penh, Cambodia</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Body -->
      <div style="padding:36px 52px; display:flex; gap:36px;">

        <!-- Left column (wider) -->
        <div style="flex:1; min-width:0;">

          <!-- Experience -->
          <div style="margin-bottom:28px;">
            <h2 style="margin:0 0 14px; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1.8px; color:#a78bfa; padding-bottom:8px; border-bottom:1.5px solid #a78bfa;">
              Experience
            </h2>

            <!-- Job 1 -->
            <div style="margin-bottom:20px;">
              <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:3px;">
                <span style="font-weight:700; font-size:13.5px; color:#111;">Full-Stack Developer</span>
                <span style="font-size:11px; color:#888; white-space:nowrap; margin-left:8px;">2021 – Present</span>
              </div>
              <p style="margin:0 0 8px; font-size:11.5px; color:#666; font-style:italic;">Self-employed · Remote</p>
              <ul style="margin:0; padding-left:16px; color:#444; font-size:12px; line-height:1.7;">
                <li style="margin-bottom:3px;">Built production-grade web apps and REST/GraphQL APIs for clients across Southeast Asia and Europe.</li>
                <li style="margin-bottom:3px;">Architected microservices with Docker, RabbitMQ, and PostgreSQL — deployed via Coolify on self-hosted infra.</li>
                <li style="margin-bottom:3px;">Developed cross-platform mobile apps with React Native & Expo, published to App Store and Google Play.</li>
                <li>Mentored junior developers and led code reviews across multiple concurrent projects.</li>
              </ul>
              <div style="margin-top:8px; display:flex; flex-wrap:wrap; gap:5px;">
                ${['TypeScript','Nuxt','React Native','Docker','PostgreSQL','NestJS','Hono'].map(t => `<span style="background:#f0edff; color:#5b21b6; font-size:10px; font-weight:600; padding:2px 8px; border-radius:99px;">${t}</span>`).join('')}
              </div>
            </div>

            <!-- Job 2 -->
            <div style="margin-bottom:4px;">
              <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:3px;">
                <span style="font-weight:700; font-size:13.5px; color:#111;">Web Developer</span>
                <span style="font-size:11px; color:#888; white-space:nowrap; margin-left:8px;">2019 – 2021</span>
              </div>
              <p style="margin:0 0 8px; font-size:11.5px; color:#666; font-style:italic;">Freelance · Cambodia</p>
              <ul style="margin:0; padding-left:16px; color:#444; font-size:12px; line-height:1.7;">
                <li style="margin-bottom:3px;">Delivered responsive marketing sites and landing pages for local businesses.</li>
                <li style="margin-bottom:3px;">Progressed from static HTML/CSS to full-stack Vue + Node.js applications over two years.</li>
                <li>Integrated third-party APIs (payments, maps, CMS) into client projects.</li>
              </ul>
              <div style="margin-top:8px; display:flex; flex-wrap:wrap; gap:5px;">
                ${['Vue','JavaScript','Tailwind CSS','Node.js','MySQL'].map(t => `<span style="background:#f0edff; color:#5b21b6; font-size:10px; font-weight:600; padding:2px 8px; border-radius:99px;">${t}</span>`).join('')}
              </div>
            </div>
          </div>

          <!-- Projects -->
          <div>
            <h2 style="margin:0 0 14px; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1.8px; color:#a78bfa; padding-bottom:8px; border-bottom:1.5px solid #a78bfa;">
              Featured Projects
            </h2>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">

              <div style="background:#fafafa; border:1px solid #ebebeb; border-radius:8px; padding:12px 14px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                  <span style="font-weight:700; font-size:12.5px; color:#111;">Mini Bank API</span>
                  <span style="font-size:10px; color:#999;">2024</span>
                </div>
                <p style="margin:0 0 8px; font-size:11px; color:#555; line-height:1.55;">Banking REST API with JWT auth, account management, and transactions. Kotlin · Spring Boot · Docker · PostgreSQL.</p>
                <a href="https://github.com/RamekhCHHOENG/kotlin-spring-mini-bank" style="font-size:10px; color:#7c3aed; text-decoration:none; font-weight:600;">github.com/RamekhCHHOENG/kotlin-spring-mini-bank</a>
              </div>

              <div style="background:#fafafa; border:1px solid #ebebeb; border-radius:8px; padding:12px 14px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                  <span style="font-weight:700; font-size:12.5px; color:#111;">Todo App</span>
                  <span style="font-size:10px; color:#999;">2023</span>
                </div>
                <p style="margin:0 0 8px; font-size:11px; color:#555; line-height:1.55;">Full-stack task manager · Next.js 13 frontend + TypeScript API. Real-time updates, deployed on Vercel.</p>
                <a href="https://github.com/RamekhCHHOENG/todo-nextjs-typescript" style="font-size:10px; color:#7c3aed; text-decoration:none; font-weight:600;">github.com/RamekhCHHOENG/todo-nextjs-typescript</a>
              </div>

              <div style="background:#fafafa; border:1px solid #ebebeb; border-radius:8px; padding:12px 14px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                  <span style="font-weight:700; font-size:12.5px; color:#111;">Portfolio</span>
                  <span style="font-size:10px; color:#999;">2026</span>
                </div>
                <p style="margin:0 0 8px; font-size:11px; color:#555; line-height:1.55;">Personal portfolio · Nuxt 4, Tailwind v4, NuxtUI · PWA-ready, liquid glass design, GitHub Pages.</p>
                <a href="https://ramekhchhoeng.github.io/portfo" style="font-size:10px; color:#7c3aed; text-decoration:none; font-weight:600;">ramekhchhoeng.github.io/portfo</a>
              </div>

              <div style="background:#fafafa; border:1px solid #ebebeb; border-radius:8px; padding:12px 14px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                  <span style="font-weight:700; font-size:12.5px; color:#111;">Todo API</span>
                  <span style="font-size:10px; color:#999;">2023</span>
                </div>
                <p style="margin:0 0 8px; font-size:11px; color:#555; line-height:1.55;">Standalone TypeScript REST API · Clean architecture, typed request/response, full CRUD. Node.js · Express.</p>
                <a href="https://github.com/RamekhCHHOENG/todo-api-typescript" style="font-size:10px; color:#7c3aed; text-decoration:none; font-weight:600;">github.com/RamekhCHHOENG/todo-api-typescript</a>
              </div>

            </div>
          </div>
        </div>

        <!-- Right column (sidebar) -->
        <div style="width:198px; flex-shrink:0;">

          <!-- Skills -->
          <div style="margin-bottom:24px;">
            <h2 style="margin:0 0 12px; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1.8px; color:#a78bfa; padding-bottom:8px; border-bottom:1.5px solid #a78bfa;">
              Skills
            </h2>

            <div style="margin-bottom:12px;">
              <p style="margin:0 0 6px; font-size:10.5px; font-weight:700; color:#555; text-transform:uppercase; letter-spacing:0.8px;">Languages</p>
              <p style="margin:0; font-size:11.5px; color:#333; line-height:1.7;">TypeScript · JavaScript · Python · Java · Rust · SQL</p>
            </div>

            <div style="margin-bottom:12px;">
              <p style="margin:0 0 6px; font-size:10.5px; font-weight:700; color:#555; text-transform:uppercase; letter-spacing:0.8px;">Backend</p>
              <p style="margin:0; font-size:11.5px; color:#333; line-height:1.7;">Hono · NestJS · FastAPI · Express · Spring Boot · Prisma · Bun</p>
            </div>

            <div style="margin-bottom:12px;">
              <p style="margin:0 0 6px; font-size:10.5px; font-weight:700; color:#555; text-transform:uppercase; letter-spacing:0.8px;">Frontend & Mobile</p>
              <p style="margin:0; font-size:11.5px; color:#333; line-height:1.7;">Next.js · Nuxt · React · Vue · React Native · Expo · Tailwind</p>
            </div>

            <div style="margin-bottom:12px;">
              <p style="margin:0 0 6px; font-size:10.5px; font-weight:700; color:#555; text-transform:uppercase; letter-spacing:0.8px;">DevOps & Infra</p>
              <p style="margin:0; font-size:11.5px; color:#333; line-height:1.7;">Docker · PostgreSQL · Redis · RabbitMQ · MinIO · Coolify · GitHub Actions</p>
            </div>

            <div>
              <p style="margin:0 0 6px; font-size:10.5px; font-weight:700; color:#555; text-transform:uppercase; letter-spacing:0.8px;">Tools</p>
              <p style="margin:0; font-size:11.5px; color:#333; line-height:1.7;">Figma · Postman · VS Code · Raycast</p>
            </div>
          </div>

          <!-- Education -->
          <div style="margin-bottom:24px;">
            <h2 style="margin:0 0 12px; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1.8px; color:#a78bfa; padding-bottom:8px; border-bottom:1.5px solid #a78bfa;">
              Education
            </h2>
            <p style="margin:0 0 3px; font-size:12.5px; font-weight:700; color:#111;">Computer Science</p>
            <p style="margin:0 0 3px; font-size:11px; color:#666; font-style:italic;">Self-directed · 2019 – Present</p>
            <p style="margin:0; font-size:11px; color:#444; line-height:1.6;">Open-source projects, online courses, and real-world client work.</p>
          </div>

          <!-- Languages spoken -->
          <div>
            <h2 style="margin:0 0 12px; font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1.8px; color:#a78bfa; padding-bottom:8px; border-bottom:1.5px solid #a78bfa;">
              Languages
            </h2>
            <div style="display:flex; flex-direction:column; gap:5px;">
              <div style="display:flex; justify-content:space-between;">
                <span style="font-size:12px; color:#222;">Khmer</span>
                <span style="font-size:11px; color:#888;">Native</span>
              </div>
              <div style="display:flex; justify-content:space-between;">
                <span style="font-size:12px; color:#222;">English</span>
                <span style="font-size:11px; color:#888;">Professional</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Footer -->
      <div style="background:#f7f5ff; border-top:1px solid #e5e0ff; padding:10px 52px; display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:10px; color:#888;">ramekhchhoeng@icloud.com</span>
        <span style="font-size:10px; color:#a78bfa; font-weight:600;">ramekhchhoeng.github.io/portfo</span>
        <span style="font-size:10px; color:#888;">github.com/RamekhCHHOENG</span>
      </div>
    `
    return el
  }

  async function downloadPDF() {
    if (import.meta.server) return
    if (isGenerating.value) return

    isGenerating.value = true

    try {
      const html2pdf = (await import('html2pdf.js')).default

      const resumeEl = buildResumeHTML()
      // Mount off-screen so layout is computed
      resumeEl.style.position = 'fixed'
      resumeEl.style.top = '-9999px'
      resumeEl.style.left = '-9999px'
      resumeEl.style.zIndex = '-1'
      document.body.appendChild(resumeEl)

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
        },
        jsPDF: { unit: 'px', format: [794, 1123], orientation: 'portrait', hotfixes: ['px_scaling'] },
      }

      await html2pdf().set(opt).from(resumeEl).save()
      document.body.removeChild(resumeEl)
    } catch (err) {
      console.error('PDF generation failed:', err)
    } finally {
      isGenerating.value = false
    }
  }

  return { downloadPDF, isGenerating }
}



