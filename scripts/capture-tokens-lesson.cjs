const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\rakes\\.gemini\\antigravity\\brain\\50ff58cf-4bbd-48f6-bd20-78e1a340387f';

async function run() {
  console.log('Launching Chrome for Tokens Lesson verification...');
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

    await page.goto('http://localhost:5173/theory/basics/tokens-keywords-identifiers', {
      waitUntil: 'networkidle0'
    });

    // Wait a brief moment for layout/animations to settle
    await new Promise(r => setTimeout(r, 600));

    const heroOutPath = path.join(ARTIFACT_DIR, `tokens_${vp.name}_hero.png`);
    await page.screenshot({ path: heroOutPath, fullPage: false });
    console.log(`Saved hero screenshot to ${heroOutPath}`);

    // Capture sections on desktop
    if (vp.name === 'desktop_1600') {
      // 1. Scroll to Token Types
      await page.evaluate(() => {
        const el = document.getElementById('token-types');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 600));
      const typesOut = path.join(ARTIFACT_DIR, `tokens_${vp.name}_types.png`);
      await page.screenshot({ path: typesOut, fullPage: false });
      console.log(`Saved types screenshot to ${typesOut}`);

      // 2. Scroll to Identifier Rules
      await page.evaluate(() => {
        const el = document.getElementById('identifier-rules');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 600));
      const rulesOut = path.join(ARTIFACT_DIR, `tokens_${vp.name}_rules.png`);
      await page.screenshot({ path: rulesOut, fullPage: false });
      console.log(`Saved rules screenshot to ${rulesOut}`);

      // 3. Scroll to Program Token Dissector
      await page.evaluate(() => {
        const el = document.getElementById('program-tokens');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 600));
      const dissectorOut = path.join(ARTIFACT_DIR, `tokens_${vp.name}_dissector.png`);
      await page.screenshot({ path: dissectorOut, fullPage: false });
      console.log(`Saved dissector screenshot to ${dissectorOut}`);

      // 4. Scroll to Summary
      await page.evaluate(() => {
        const el = document.getElementById('tokens-summary');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 600));
      const summaryOut = path.join(ARTIFACT_DIR, `tokens_${vp.name}_summary.png`);
      await page.screenshot({ path: summaryOut, fullPage: false });
      console.log(`Saved summary screenshot to ${summaryOut}`);

      // 5. Scroll to Quiz
      await page.evaluate(() => {
        const el = document.getElementById('tokens-quiz');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 600));
      const quizOut = path.join(ARTIFACT_DIR, `tokens_${vp.name}_quiz.png`);
      await page.screenshot({ path: quizOut, fullPage: false });
      console.log(`Saved quiz screenshot to ${quizOut}`);
    }
  }

  await browser.close();
  console.log('All tokens screenshots captured successfully!');
}

run().catch(err => {
  console.error('Error during tokens screenshot capture:', err);
  process.exit(1);
});
