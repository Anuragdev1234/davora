const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\rakes\\.gemini\\antigravity\\brain\\50ff58cf-4bbd-48f6-bd20-78e1a340387f';

async function run() {
  console.log('Launching Chrome for Operators Lesson visual verification...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  const viewports = [
    { name: 'desktop_1600', width: 1600, height: 1000 },
    { name: 'laptop_1440', width: 1440, height: 900 },
    { name: 'tablet_768', width: 768, height: 1024 },
    { name: 'mobile_390', width: 390, height: 844, isMobile: true }
  ];

  for (const vp of viewports) {
    console.log(`Setting viewport ${vp.name} (${vp.width}x${vp.height})...`);
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      isMobile: !!vp.isMobile
    });

    await page.goto('http://localhost:5173/theory/basics/operators-in-c', {
      waitUntil: 'networkidle0'
    });

    // Wait for animations and layout
    await new Promise(r => setTimeout(r, 800));

    // Capture hero
    const heroOut = path.join(ARTIFACT_DIR, `operators_${vp.name}_hero.png`);
    await page.screenshot({ path: heroOut, fullPage: false });
    console.log(`Saved hero screenshot to ${heroOut}`);

    if (vp.name === 'desktop_1600') {
      // 1. Click Relational Operators panel to test active interaction & connector line emphasis
      await page.evaluate(() => {
        const relPanel = document.getElementById('hero-panel-relational');
        if (relPanel) relPanel.click();
      });
      await new Promise(r => setTimeout(r, 500));
      const activeOut = path.join(ARTIFACT_DIR, `operators_${vp.name}_active_category.png`);
      await page.screenshot({ path: activeOut, fullPage: false });
      console.log(`Saved active category screenshot to ${activeOut}`);

      // 2. Scroll to Types of Operators in C (Taxonomy section)
      await page.evaluate(() => {
        const el = document.getElementById('operator-types');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 600));
      const taxonomyOut = path.join(ARTIFACT_DIR, `operators_${vp.name}_taxonomy.png`);
      await page.screenshot({ path: taxonomyOut, fullPage: false });
      console.log(`Saved taxonomy screenshot to ${taxonomyOut}`);

      // 3. Scroll to In-Depth Sections (Bitwise 4-bit)
      await page.evaluate(() => {
        const el = document.getElementById('section-bitwise');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 600));
      const inDepthOut = path.join(ARTIFACT_DIR, `operators_${vp.name}_indepth.png`);
      await page.screenshot({ path: inDepthOut, fullPage: false });
      console.log(`Saved indepth screenshot to ${inDepthOut}`);

      // 4. Scroll to Precedence Table
      await page.evaluate(() => {
        const el = document.getElementById('section-precedence');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 600));
      const precedenceOut = path.join(ARTIFACT_DIR, `operators_${vp.name}_precedence.png`);
      await page.screenshot({ path: precedenceOut, fullPage: false });
      console.log(`Saved precedence screenshot to ${precedenceOut}`);

      // 5. Scroll to Quick Revision Quiz
      await page.evaluate(() => {
        const el = document.getElementById('section-quiz');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 600));
      const quizOut = path.join(ARTIFACT_DIR, `operators_${vp.name}_quiz.png`);
      await page.screenshot({ path: quizOut, fullPage: false });
      console.log(`Saved quiz screenshot to ${quizOut}`);
    }
  }

  await browser.close();
  console.log('All operators screenshots captured successfully!');
}

run().catch((err) => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
