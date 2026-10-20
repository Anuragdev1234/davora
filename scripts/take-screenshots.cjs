const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\rakes\\.gemini\\antigravity\\brain\\50ff58cf-4bbd-48f6-bd20-78e1a340387f';

async function run() {
  console.log('Launching Chrome...');
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

    await page.goto('http://localhost:5173/theory/structure-of-a-c-program', {
      waitUntil: 'networkidle0'
    });

    // Wait a brief moment for layout/animations to settle
    await new Promise(r => setTimeout(r, 600));

    const heroOutPath = path.join(ARTIFACT_DIR, `render_${vp.name}_hero.png`);
    await page.screenshot({ path: heroOutPath, fullPage: false });
    console.log(`Saved hero screenshot to ${heroOutPath}`);

    // Capture lower interactive sections on desktop
    if (vp.name === 'desktop_1600') {
      // Scroll to Building Blocks
      await page.evaluate(() => {
        const el = document.getElementById('program-components');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 600));
      const blocksOutPath = path.join(ARTIFACT_DIR, `render_${vp.name}_blocks.png`);
      await page.screenshot({ path: blocksOutPath, fullPage: false });
      console.log(`Saved blocks screenshot to ${blocksOutPath}`);

      // Scroll to Code Explorer
      await page.evaluate(() => {
        const el = document.getElementById('code-explorer');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 600));
      const explorerOutPath = path.join(ARTIFACT_DIR, `render_${vp.name}_explorer.png`);
      await page.screenshot({ path: explorerOutPath, fullPage: false });
      console.log(`Saved explorer screenshot to ${explorerOutPath}`);

      // Scroll to How it Works / Simulator
      await page.evaluate(() => {
        const el = document.getElementById('how-it-works');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 600));
      const simOutPath = path.join(ARTIFACT_DIR, `render_${vp.name}_simulator.png`);
      await page.screenshot({ path: simOutPath, fullPage: false });
      console.log(`Saved simulator screenshot to ${simOutPath}`);

      // Scroll to Output
      await page.evaluate(() => {
        const el = document.getElementById('program-output');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 600));
      const outputOutPath = path.join(ARTIFACT_DIR, `render_${vp.name}_output.png`);
      await page.screenshot({ path: outputOutPath, fullPage: false });
      console.log(`Saved output screenshot to ${outputOutPath}`);

      // Scroll to Practice Quiz
      await page.evaluate(() => {
        const el = document.getElementById('practice-quiz');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 600));
      const quizOutPath = path.join(ARTIFACT_DIR, `render_${vp.name}_quiz.png`);
      await page.screenshot({ path: quizOutPath, fullPage: false });
      console.log(`Saved quiz screenshot to ${quizOutPath}`);
    }
  }

  await browser.close();
  console.log('All screenshots completed successfully!');
}

run().catch(err => {
  console.error('Error running screenshots:', err);
  process.exit(1);
});
