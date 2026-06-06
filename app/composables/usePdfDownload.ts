export function usePdfDownload() {
  const isGenerating = ref(false)

  const resumeActionLabel = computed(() => 'View Resume')
  const resumeViewLabel = computed(() => 'Download Resume')

  function scrollToCv() {
    if (!import.meta.client) return

    const experience = document.querySelector('#experience')
    if (experience) {
      experience.scrollIntoView({ behavior: 'smooth' })
      return
    }

    window.location.hash = 'experience'
  }

  function downloadPDF() {
    if (import.meta.server || isGenerating.value) return
    scrollToCv()
  }

  function buildResumeHtml(profileSrc: string = '') {
    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ramekh Chhoeng - Resume</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; }
    @page { size: A4; margin: 0; }
    body {
      margin: 0;
      background: #f1f5f9;
      color: #1e293b;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
      font-size: 13px;
      line-height: 1.55;
      -webkit-font-smoothing: antialiased;
    }
    .page {
      width: 210mm;
      min-height: 297mm;
      margin: 24px auto;
      display: grid;
      grid-template-columns: 74mm 1fr;
      background: #ffffff;
      box-shadow: 0 24px 80px rgba(15, 23, 42, 0.12);
      border-radius: 12px;
      overflow: hidden;
    }
    aside {
      padding: 44px 28px;
      background: #0b0f19;
      color: #cbd5e1;
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
    main {
      padding: 44px 40px;
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
    .profile-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin-bottom: 8px;
    }
    .profile-frame {
      width: 104px;
      height: 104px;
      border-radius: 50%;
      padding: 3px;
      background: linear-gradient(135deg, #d6a72d 0%, rgba(214,167,45,0.2) 100%);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
      margin-bottom: 18px;
    }
    .profile-img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      display: block;
    }
    h1 {
      margin: 0;
      color: #ffffff;
      font-size: 24px;
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -0.02em;
    }
    .title {
      margin-top: 6px;
      color: #d6a72d;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    h2 {
      margin: 0 0 12px;
      color: #0b0f19;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    h2::after {
      content: '';
      flex: 1;
      height: 1.5px;
      background: #f1f5f9;
      margin-left: 8px;
    }
    h3 {
      margin: 0 0 4px;
      color: #0b0f19;
      font-size: 14px;
      font-weight: 700;
    }
    .side-section {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .side-heading {
      color: #ffffff;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 6px;
      margin-bottom: 4px;
    }
    .contact-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .label {
      color: #64748b;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .side-text,
    .side-link {
      color: #e2e8f0;
      font-size: 12px;
      text-decoration: none;
      word-break: break-all;
    }
    .side-link:hover {
      color: #ffffff;
      text-decoration: underline;
    }
    .chip-container {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 4px;
    }
    .chip {
      padding: 4px 10px;
      border: 1px solid rgba(214, 167, 45, 0.25);
      border-radius: 6px;
      background: rgba(214, 167, 45, 0.06);
      color: #fef3c7;
      font-size: 11px;
      font-weight: 600;
    }
    .summary {
      margin: 0;
      padding: 16px 20px;
      border-left: 4px solid #d6a72d;
      border-radius: 0 8px 8px 0;
      background: #f8fafc;
      color: #475569;
      font-size: 13px;
      line-height: 1.6;
    }
    .timeline {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .timeline-item {
      position: relative;
      margin-left: 8px;
      padding-left: 20px;
      border-left: 1.5px solid #e2e8f0;
    }
    .timeline-item:last-child {
      border-left: 1.5px solid transparent;
      padding-bottom: 0;
    }
    .dot {
      position: absolute;
      left: -5.5px;
      top: 5px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #d6a72d;
      box-shadow: 0 0 0 3px #fef3c7;
    }
    .meta {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      color: #64748b;
      font-size: 11.5px;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .redacted {
      color: #0891b2;
      filter: blur(2.5px);
      user-select: none;
    }
    ul {
      margin: 6px 0 0;
      padding-left: 16px;
      color: #475569;
    }
    li {
      margin-bottom: 5px;
    }
    .ai-tool-group {
      margin-bottom: 8px;
    }
    .ai-tool-title {
      font-weight: 700;
      font-size: 12.5px;
      color: #334155;
    }
    @media print {
      body { background: #ffffff; }
      .page { margin: 0; box-shadow: none; border-radius: 0; }
    }
    @media (max-width: 820px) {
      body { background: #f8fafc; padding: 16px; }
      .page {
        width: auto;
        min-height: 0;
        margin: 0;
        display: block;
        box-shadow: none;
      }
      aside {
        padding: 30px 24px;
      }
      main {
        padding: 30px 24px;
      }
    }
  </style>
</head>
<body>
  <div class="page">
    <aside>
      <div class="profile-container">
        <div class="profile-frame">
          <img src="${profileSrc || 'https://ramekhchhoeng.com/ramekhchhoeng.jpg'}" alt="Ramekh Chhoeng" class="profile-img" onerror="this.style.display='none'">
        </div>
        <h1>Ramekh Chhoeng</h1>
        <div class="title">Frontend Engineer</div>
      </div>

      <div class="side-section">
        <div class="side-heading">Contact</div>
        <div class="contact-item">
          <span class="label">Location</span>
          <div class="side-text">Phnom Penh, Cambodia</div>
        </div>
        <div class="contact-item">
          <span class="label">Phone</span>
          <div class="side-text">+855 97 818 818 3</div>
        </div>
        <div class="contact-item">
          <span class="label">Email</span>
          <a class="side-link" href="mailto:ramekhchhoeng@icloud.com">ramekhchhoeng@icloud.com</a>
        </div>
        <div class="contact-item">
          <span class="label">Website</span>
          <a class="side-link" href="https://ramekhchhoeng.com" target="_blank">ramekhchhoeng.com</a>
        </div>
        <div class="contact-item">
          <span class="label">GitHub</span>
          <a class="side-link" href="https://github.com/RamekhCHHOENG" target="_blank">github.com/RamekhCHHOENG</a>
        </div>
        <div class="contact-item">
          <span class="label">LinkedIn</span>
          <a class="side-link" href="https://www.linkedin.com/in/ramekhchhoeng/" target="_blank">linkedin.com/in/ramekhchhoeng</a>
        </div>
      </div>

      <div class="side-section">
        <div class="side-heading">Core Skills</div>
        <div class="chip-container">
          <span class="chip">Vue.js</span>
          <span class="chip">Nuxt</span>
          <span class="chip">React.js</span>
          <span class="chip">Node.js</span>
          <span class="chip">TypeScript</span>
          <span class="chip">TailwindCSS</span>
          <span class="chip">REST APIs</span>
          <span class="chip">Swift</span>
        </div>
      </div>

      <div class="side-section">
        <div class="side-heading">Languages</div>
        <div class="contact-item">
          <span class="label">Khmer</span>
          <div class="side-text">Native</div>
        </div>
        <div class="contact-item">
          <span class="label">English</span>
          <div class="side-text">Working proficiency</div>
        </div>
      </div>
    </aside>

    <main>
      <p class="summary">
        Frontend Engineer with 4.5+ years of experience building production web applications
        across enterprise, education, government, and product teams. Strongest in Vue.js,
        Nuxt, React.js, TypeScript, REST API integration, reusable component systems, and
        polished user interfaces.
      </p>

      <section class="section">
        <h2>Work Experience</h2>
        <div class="timeline">
          <article class="timeline-item">
            <span class="dot"></span>
            <h3>Frontend Developer</h3>
            <div class="meta"><span class="redacted">Company name</span><span>2024 - Present</span></div>
            <ul>
              <li>Build production interfaces with Nuxt and React.js.</li>
              <li>Integrate frontend features with Node.js services and APIs.</li>
              <li>Maintain reusable UI patterns and application performance.</li>
            </ul>
          </article>
          <article class="timeline-item">
            <span class="dot"></span>
            <h3>Frontend Engineer</h3>
            <div class="meta"><span class="redacted">Company name</span><span>Dec 2022 - 2024</span></div>
            <ul>
              <li>Established core project infrastructure from the ground up.</li>
              <li>Built and launched web applications using Vue.js and Nuxt.</li>
              <li>Drove bug fixing, maintenance, and performance optimization across products.</li>
            </ul>
          </article>
          <article class="timeline-item">
            <span class="dot"></span>
            <h3>Software Developer</h3>
            <div class="meta"><span class="redacted">Company name</span><span>Jan 2020 - Dec 2022</span></div>
            <ul>
              <li>Contributed to and shipped 3 production Vue.js projects.</li>
              <li>Implemented frontend features from business requirements and REST APIs.</li>
              <li>Built reusable custom components aligned with project design systems.</li>
            </ul>
          </article>
          <article class="timeline-item">
            <span class="dot"></span>
            <h3>iOS Developer</h3>
            <div class="meta"><span class="redacted">Company name</span><span>Sep 2019 - Jan 2020</span></div>
            <ul>
              <li>Developed Swift application features using programmatic UIKit.</li>
              <li>Supported bug fixing, maintenance, testing, and iterative product refinement.</li>
            </ul>
          </article>
        </div>
      </section>

      <section class="section">
        <h2>AI-Assisted Development</h2>
        <div style="display: flex; flex-direction: column; gap: 10px; color: #475569;">
          <div class="ai-tool-group">
            <span class="ai-tool-title">⚡ GitHub Copilot / Codex:</span> Autocompletion, rapid boilerplate setup, unit testing.
          </div>
          <div class="ai-tool-group">
            <span class="ai-tool-title">🧠 Claude:</span> Complex code refactoring, system architecture brainstorming, and logic debugging.
          </div>
          <div class="ai-tool-group">
            <span class="ai-tool-title">✦ Gemini:</span> Multi-file codebase-aware changes, pair programming, and framework updates.
          </div>
        </div>
      </section>

      <section class="section">
        <h2>Education</h2>
        <div class="timeline">
          <article class="timeline-item">
            <span class="dot"></span>
            <h3>Master Degree</h3>
            <div class="meta"><span class="redacted">School name</span><span>2026 - 2027</span></div>
          </article>
          <article class="timeline-item">
            <span class="dot"></span>
            <h3>Bachelor of Computer Science</h3>
            <div class="meta"><span class="redacted">School name</span><span>2019 - 2021</span></div>
          </article>
          <article class="timeline-item">
            <span class="dot"></span>
            <h3>Associate Degree</h3>
            <div class="meta"><span class="redacted">School name</span><span>2017 - 2019</span></div>
          </article>
        </div>
      </section>
    </main>
  </div>
</body>
</html>`
  }

  function getBase64FromImageUrl(url: string): Promise<string> {
    return new Promise((resolve) => {
      const img = new Image()
      img.setAttribute('crossOrigin', 'anonymous')
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(img, 0, 0)
          try {
            const dataURL = canvas.toDataURL('image/jpeg')
            resolve(dataURL)
          } catch (e) {
            resolve('')
          }
        } else {
          resolve('')
        }
      }
      img.onerror = () => {
        resolve('')
      }
      img.src = url
    })
  }

  async function viewResume() {
    if (import.meta.server || isGenerating.value) return

    isGenerating.value = true
    try {
      const imgPath = window.location.origin + '/ramekhchhoeng.jpg'
      const profileBase64 = await getBase64FromImageUrl(imgPath)

      const htmlContent = buildResumeHtml(profileBase64)
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'Ramekh_Chhoeng_Resume.html'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Failed to view/download resume', err)
    } finally {
      window.setTimeout(() => {
        isGenerating.value = false
      }, 300)
    }
  }

  return {
    downloadPDF,
    viewResume,
    requestResume: scrollToCv,
    isGenerating,
    canDownloadResume: computed(() => true),
    resumeActionLabel,
    resumeViewLabel,
  }
}
