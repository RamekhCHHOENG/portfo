export function usePdfDownload() {
  const isGenerating = ref(false)

  // ── Fetch profile photo as base64 ─────────────────────────────────────────
  async function loadPhotoDataURL(): Promise<string> {
    try {
      const r = await fetch('/ramekhchhoeng.jpg')
      const blob = await r.blob()
      return await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.readAsDataURL(blob)
      })
    }
    catch { return '' }
  }

  // ── Build resume HTML (resume.io style) ───────────────────────────────────
  function buildResumeHTML(photoSrc: string): HTMLElement {
    const root = document.createElement('div')
    root.style.cssText = [
      'width:794px',
      'background:#fff',
      'font-family:"Helvetica Neue",Helvetica,Arial,sans-serif',
      'font-size:13px',
      'color:#2d2d2d',
      'line-height:1.5',
      'box-sizing:border-box',
    ].join(';')

    // ── Helpers ──────────────────────────────────────────────────────────────
    const sideHeader = (label: string) => `
      <div style="text-align:center;margin:16px 0 10px;">
        <span style="font-size:10px;font-weight:700;letter-spacing:2.5px;color:#1a1a1a;">
          <span style="font-size:8px;vertical-align:middle;">&#9702;</span>
          &nbsp;${label}&nbsp;
          <span style="font-size:8px;vertical-align:middle;">&#9702;</span>
        </span>
      </div>`

    const rightHeader = (svgPath: string, label: string) => `
      <div style="display:flex;align-items:center;gap:0;margin-bottom:14px;margin-top:18px;">
        <div style="position:absolute;left:4px;width:28px;height:28px;border-radius:50%;
                    background:#f0f0f0;display:flex;align-items:center;justify-content:center;">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
               fill="none" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            ${svgPath}
          </svg>
        </div>
        <h2 style="margin:0;font-size:12.5px;font-weight:700;letter-spacing:2.5px;
                   text-transform:uppercase;color:#1a1a1a;">${label}</h2>
      </div>`

    const langBar = (name: string, pct: number) => `
      <div style="margin-bottom:10px;">
        <p style="margin:0 0 4px;font-size:11px;text-align:center;">${name}</p>
        <div style="width:120px;height:2.5px;background:#e0e0e0;margin:0 auto;border-radius:2px;">
          <div style="width:${pct}%;height:100%;background:#1a1a1a;border-radius:2px;"></div>
        </div>
      </div>`

    const dot = `
      <div style="position:absolute;left:-34px;top:5px;
                  width:10px;height:10px;border-radius:50%;
                  border:2px solid #888;background:#fff;box-sizing:border-box;"></div>`

    const li = (text: string) =>
      `<li style="margin-bottom:3px;font-size:11px;color:#333;line-height:1.65;">${text}</li>`

    // ── HTML ─────────────────────────────────────────────────────────────────
    root.innerHTML = `

    <!-- ═══════════ HEADER ═══════════ -->
    <div style="text-align:center;padding:28px 40px 20px;background:#fff;">
      ${photoSrc
        ? `<img src="${photoSrc}"
               style="width:96px;height:96px;object-fit:cover;object-position:top center;
                      border-radius:5px;margin-bottom:14px;display:block;
                      margin-left:auto;margin-right:auto;" />`
        : ''}
      <h1 style="margin:0 0 10px;font-size:28px;font-weight:900;
                 letter-spacing:6px;color:#1a1a1a;text-transform:uppercase;">
        RAMEKH CHHOENG
      </h1>
      <p style="margin:0;font-size:10px;letter-spacing:1.5px;color:#777;
                text-transform:uppercase;line-height:1.4;">
        FRONTEND ENGINEER LEAD
        &nbsp;&nbsp;&bull;&nbsp;&nbsp;
        &#128205; PHNOM PENH 12000, CAMBODIA
        &nbsp;&nbsp;&bull;&nbsp;&nbsp;
        &#9742; +855 97 818 818 3
      </p>
    </div>
    <div style="height:1px;background:#e0e0e0;margin:0 40px;"></div>

    <!-- ═══════════ BODY ═══════════ -->
    <div style="display:flex;min-height:880px;">

      <!-- ─── LEFT SIDEBAR ─── -->
      <div style="width:235px;flex-shrink:0;padding:4px 16px 20px;
                  border-right:1px solid #ebebeb;text-align:center;">

        ${sideHeader('DETAILS')}
        <div style="font-size:11px;line-height:1.75;color:#2d2d2d;">
          <p style="margin:0;">Norodom Blvd, Tontle Basak,</p>
          <p style="margin:0;">Chamka Mon</p>
          <p style="margin:0;">Phnom Penh 12000</p>
          <p style="margin:0 0 6px;">Cambodia</p>
          <p style="margin:0 0 2px;text-decoration:underline;">+855 97 818 818 3</p>
          <p style="margin:0;text-decoration:underline;font-size:10.5px;">ramekhchhoeng@icloud.com</p>
          <div style="margin-top:10px;">
            <p style="margin:0 0 1px;font-size:10px;color:#999;">Date / Place of birth</p>
            <p style="margin:0;">06/09/99</p>
            <p style="margin:0 0 8px;">Siem Reap</p>
            <p style="margin:0 0 1px;font-size:10px;color:#999;">Nationality</p>
            <p style="margin:0;">Cambodian</p>
          </div>
        </div>
        <div style="height:1px;background:#e8e8e8;margin:12px 0;"></div>

        ${sideHeader('LINKS')}
        <div style="font-size:11px;margin-bottom:4px;">
          <p style="margin:0;text-decoration:underline;">Github: RamekhCHHOENG</p>
        </div>
        <div style="height:1px;background:#e8e8e8;margin:12px 0;"></div>

        ${sideHeader('SOFT SKILLS')}
        <div style="font-size:11px;line-height:1.85;margin-bottom:4px;">
          ${['Fast Learner','Communication Skills','Teamwork Skills','Problem Solving','Ability to Work Under Pressure']
            .map(s => `<p style="margin:0;">${s}</p>`).join('')}
        </div>
        <div style="height:1px;background:#e8e8e8;margin:12px 0;"></div>

        ${sideHeader('LANGUAGES')}
        <div style="margin-bottom:4px;">
          ${langBar('Khmer', 100)}
          ${langBar('English', 60)}
        </div>
        <div style="height:1px;background:#e8e8e8;margin:12px 0;"></div>

        ${sideHeader('HOBBIES')}
        <div style="font-size:11px;line-height:1.85;">
          ${['Reading','Research new technology','Watching Move','Listening to music']
            .map(h => `<p style="margin:0;">${h}</p>`).join('')}
        </div>

      </div>

      <!-- ─── RIGHT CONTENT ─── -->
      <div style="flex:1;min-width:0;padding:4px 30px 20px 0;position:relative;">

        <!-- Vertical timeline line -->
        <div style="position:absolute;left:18px;top:0;bottom:0;width:1px;background:#d8d8d8;"></div>

        <!-- All content indented past the timeline line -->
        <div style="padding-left:52px;">

          <!-- PROFILE -->
          ${rightHeader(
            `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
             <circle cx="12" cy="7" r="4"/>`,
            'PROFILE',
          )}
          <p style="margin:0;font-size:11.5px;line-height:1.75;color:#333;">
            With over 4 and a half years of experience as a Front-end Developer, I specialize
            in designing and developing user interfaces, testing, and debugging.
            Proficient in web application development and mobile applications, I am eager to
            expand my expertise to include Rest API. Demonstrating a proven ability to
            optimize web functionality, I have made significant contributions to team growth.
            Committed to delivering high-quality results, I strive to foster collaborative
            success within the team
          </p>

          <!-- EMPLOYMENT HISTORY -->
          ${rightHeader(
            `<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
             <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>`,
            'EMPLOYMENT HISTORY',
          )}

          <!-- Job 1 -->
          <div style="position:relative;margin-bottom:18px;">
            ${dot}
            <p style="margin:0 0 2px;font-size:12px;font-weight:700;color:#1a1a1a;">
              Software Developer at IDEALINK CONSULTING LTD, Phnom Penh
            </p>
            <p style="margin:0 0 8px;font-size:11px;color:#999;">Dec 2022 &#8212; Present</p>
            <p style="margin:0 0 7px;font-size:11px;color:#555;line-height:1.65;">
              Is a management, professional training and business technology company.
              Embracing business and information technology expertise with market understanding
              and the values customers demand, helps our clients to transform their business in
              the context of uncertainty and competitive environment.
            </p>
            <ul style="margin:0;padding-left:16px;">
              ${li('Established the core project infrastructure from the ground up')}
              ${li('Successfully built and launched a web application using Vuejs')}
              ${li('Contributed to the design of the web application user interface')}
              ${li('Performed bug fixing and maintenance tasks for web application')}
            </ul>
          </div>

          <!-- Job 2 -->
          <div style="position:relative;margin-bottom:18px;">
            ${dot}
            <p style="margin:0 0 2px;font-size:12px;font-weight:700;color:#1a1a1a;">
              Software Developer &nbsp;at&nbsp; Soramitsu Khmer Co., Ltd, Phnom Penh
            </p>
            <p style="margin:0 0 8px;font-size:11px;color:#999;">Jan 2020 &#8212; Dec 2022</p>
            <p style="margin:0 0 7px;font-size:11px;color:#555;line-height:1.65;">
              Soramitsu Khmer is a software technology company based in Cambodia. Focusing on
              product based solutions for enterprises, universities, and governments.
            </p>
            <ul style="margin:0;padding-left:16px;">
              ${li('Successfully contributed to and completed 3 projects utilizing VueJs')}
              ${li('Collaborated with a team to develop and implement the front-end of projects based on business requirements')}
              ${li('Worked closely with the development team to implement custom components as per project requirements')}
              ${li('Addressed complex bugs in the projects to ensure smooth functionality')}
              ${li('Managed and maintained the projects, ensuring their ongoing functionality and usability')}
              ${li('Enhanced and improved both internal and external projects.')}
            </ul>
          </div>

          <!-- Job 3 -->
          <div style="position:relative;margin-bottom:22px;">
            ${dot}
            <p style="margin:0 0 8px;font-size:11px;color:#999;">Sept 2019 &#8212; Jan 2020</p>
            <ul style="margin:0;padding-left:16px;">
              ${li('Played a key role in developing and implementing a product based on business requirements using Swift (Programmatically)')}
              ${li('Participated in bug fixing activities to improve the overall quality of the product')}
              ${li('Conducted ongoing maintenance tasks to ensure the product continued to meet business requirements and user needs')}
              ${li('Maintained the product and ensured it remained functional')}
            </ul>
          </div>

          <!-- EDUCATION -->
          ${rightHeader(
            `<path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
             <path d="M6 12v5c3 3 9 3 12 0v-5"/>`,
            'EDUCATION',
          )}

          ${[
            { school: 'University of Puthisastra (UP), Phnom Penh', degree: 'Bachelor Degree Computer Science', period: 'Oct 2019 &#8212; Nov 2021' },
            { school: 'Passerelles Numeriques Cambodia (PNC), Phnom Penh', degree: 'Associate Degree', period: 'Oct 2017 &#8212; Oct 2019' },
            { school: 'Puok High School, Siem Reap', degree: 'Bac II', period: 'Oct 2014 &#8212; Nov 2017' },
          ].map(e => `
            <div style="position:relative;margin-bottom:12px;">
              ${dot}
              <p style="margin:0 0 1px;font-size:12px;font-weight:700;color:#1a1a1a;">${e.school}</p>
              <p style="margin:0 0 1px;font-size:11px;color:#555;">${e.degree}</p>
              <p style="margin:0;font-size:11px;color:#999;">${e.period}</p>
            </div>
          `).join('')}

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
      const [html2pdf, photoSrc] = await Promise.all([
        import('html2pdf.js').then(m => m.default),
        loadPhotoDataURL(),
      ])

      const resumeEl = buildResumeHTML(photoSrc)

      const wrapper = document.createElement('div')
      wrapper.style.cssText = 'position:fixed;top:0;left:0;width:794px;height:0;overflow:hidden;z-index:-9999;pointer-events:none;'
      wrapper.appendChild(resumeEl)
      document.body.appendChild(wrapper)

      await new Promise(resolve => requestAnimationFrame(resolve))
      await new Promise(resolve => setTimeout(resolve, 100))

      const opt = {
        margin: 0,
        filename: 'Ramekh_Chhoeng_Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: false,
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
    }
    catch (err) {
      console.error('PDF generation failed:', err)
    }
    finally {
      isGenerating.value = false
    }
  }

  // ── View resume as HTML in a new tab ──────────────────────────────────────
  async function viewResume() {
    if (import.meta.server) return
    // Open window BEFORE any await so popup blockers see the user gesture
    const win = window.open('', '_blank', 'noopener,noreferrer')
    if (!win) return
    const photoSrc = await loadPhotoDataURL()
    const el = buildResumeHTML(photoSrc)
    win.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Ramekh Chhoeng &#8212; Resume</title>
  <style>*{box-sizing:border-box}body{margin:0;padding:32px 0;background:#e8e8e8;display:flex;justify-content:center;}</style>
</head>
<body>${el.outerHTML}</body>
</html>`)
    win.document.close()
  }

  return { downloadPDF, viewResume, isGenerating }
}
