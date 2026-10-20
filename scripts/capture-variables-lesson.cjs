const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\rakes\\.gemini\\antigravity\\brain\\50ff58cf-4bbd-48f6-bd20-78e1a340387f';

async function run() {
  console.log('Launching Chrome for Variables Lesson visual verification...');
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

    await page.goto('http://localhost:5173/theory/basics/variables-and-data-types', {
      waitUntil: 'networkidle0'
    });

    // Wait for layout/animations to settle
    await new Promise(r => setTimeout(r, 700));

    const heroOutPath = path.join(ARTIFACT_DIR, `variables_${vp.name}_hero.png`);
    await page.screenshot({ path: heroOutPath, fullPage: false });
    console.log(`Saved hero screenshot to ${heroOutPath}`);

    // Capture sections on desktop 1600
    if (vp.name === 'desktop_1600') {
      // 1. Scroll to Variables in C (Section 1)
      await page.evaluate(() => {
        const el = document.getElementById('section-variables');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 600));
      const sec1Out = path.join(ARTIFACT_DIR, `variables_${vp.name}_sec1_variables.png`);
      await page.screenshot({ path: sec1Out, fullPage: false });
      console.log(`Saved sec1 screenshot to ${sec1Out}`);

      // 2. Scroll to Section 2 (Constants)
      await page.evaluate(() => {
        const el = document.getElementById('section-constants');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 600));
      const sec2Out = path.join(ARTIFACT_DIR, `variables_${vp.name}_sec2_constants.png`);
      await page.screenshot({ path: sec2Out, fullPage: false });
      console.log(`Saved sec2 screenshot to ${sec2Out}`);

      // 3. Scroll to Section 3 (Scope)
      await page.evaluate(() => {
        const el = document.getElementById('section-scope');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 600));
      const sec3Out = path.join(ARTIFACT_DIR, `variables_${vp.name}_sec3_scope.png`);
      await page.screenshot({ path: sec3Out, fullPage: false });
      console.log(`Saved sec3 screenshot to ${sec3Out}`);

      // 4. Scroll to Section 4 (Data Types)
      await page.evaluate(() => {
        const el = document.getElementById('section-datatypes');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 600));
      const sec4Out = path.join(ARTIFACT_DIR, `variables_${vp.name}_sec4_datatypes.png`);
      await page.screenshot({ path: sec4Out, fullPage: false });
      console.log(`Saved sec4 screenshot to ${sec4Out}`);

      // 5. Scroll to Section 5 (Type Conversion)
      await page.evaluate(() => {
        const el = document.getElementById('section-type-conversion');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 600));
      const sec5Out = path.join(ARTIFACT_DIR, `variables_${vp.name}_sec5_conversion.png`);
      await page.screenshot({ path: sec5Out, fullPage: false });
      console.log(`Saved sec5 screenshot to ${sec5Out}`);

      // 6. Scroll to Key Takeaways & Quiz
      await page.evaluate(() => {
        const el = document.getElementById('section-takeaways');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 600));
      const takeawaysOut = path.join(ARTIFACT_DIR, `variables_${vp.name}_takeaways.png`);
      await page.screenshot({ path: takeawaysOut, fullPage: false });
      console.log(`Saved takeaways screenshot to ${takeawaysOut}`);

      // 7. Scroll to Quiz
      await page.evaluate(() => {
        const el = document.getElementById('section-quiz');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 600));
      const quizOut = path.join(ARTIFACT_DIR, `variables_${vp.name}_quiz.png`);
      await page.screenshot({ path: quizOut, fullPage: false });
      console.log(`Saved quiz screenshot to ${quizOut}`);
    }
  }

  await browser.close();
  console.log('All variables screenshots captured successfully!');
}

run().catch((err) => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
