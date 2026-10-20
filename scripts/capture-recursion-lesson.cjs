const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\rakes\\.gemini\\antigravity\\brain\\50ff58cf-4bbd-48f6-bd20-78e1a340387f';

async function run() {
  console.log('Launching Chrome for Recursion in C verification...');
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

    await page.goto('http://localhost:5173/theory/basics/recursion', {
      waitUntil: 'networkidle0'
    });

    // Wait for initial render and animations
    await new Promise(r => setTimeout(r, 1200));

    // Capture hero
    const heroOut = path.join(ARTIFACT_DIR, `recursion_${vp.name}_hero.png`);
    await page.screenshot({ path: heroOut, fullPage: false });
    console.log(`Saved hero screenshot to ${heroOut}`);

    if (vp.name === 'desktop_1600') {
      // 1. Scroll to Basics (#recursion-basics)
      await page.evaluate(() => {
        const el = document.getElementById('recursion-basics');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      });
      await new Promise(r => setTimeout(r, 800));
      const basicsOut = path.join(ARTIFACT_DIR, `recursion_${vp.name}_basics.png`);
      await page.screenshot({ path: basicsOut, fullPage: false });
      console.log(`Saved basics screenshot to ${basicsOut}`);

      // 2. Scroll to Visualizing Calls (#visualizing-calls)
      await page.evaluate(() => {
        const el = document.getElementById('visualizing-calls');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      });
      await new Promise(r => setTimeout(r, 800));
      const vizOut = path.join(ARTIFACT_DIR, `recursion_${vp.name}_visualizing_calls.png`);
      await page.screenshot({ path: vizOut, fullPage: false });
      console.log(`Saved visualizing calls screenshot to ${vizOut}`);

      // 3. Scroll to Types of Recursion (#types-recursion)
      await page.evaluate(() => {
        const el = document.getElementById('types-recursion');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      });
      await new Promise(r => setTimeout(r, 800));
      const typesOut = path.join(ARTIFACT_DIR, `recursion_${vp.name}_types.png`);
      await page.screenshot({ path: typesOut, fullPage: false });
      console.log(`Saved types screenshot to ${typesOut}`);

      // 4. Scroll to Factorial Simulator (#factorial-simulator)
      await page.evaluate(() => {
        const el = document.getElementById('factorial-simulator');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      });
      await new Promise(r => setTimeout(r, 800));
      const factOut = path.join(ARTIFACT_DIR, `recursion_${vp.name}_factorial.png`);
      await page.screenshot({ path: factOut, fullPage: false });
      console.log(`Saved factorial screenshot to ${factOut}`);

      // 5. Scroll to Comparison & Mistakes (#comparison-and-mistakes)
      await page.evaluate(() => {
        const el = document.getElementById('comparison-and-mistakes');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      });
      await new Promise(r => setTimeout(r, 800));
      const compOut = path.join(ARTIFACT_DIR, `recursion_${vp.name}_comparison_mistakes.png`);
      await page.screenshot({ path: compOut, fullPage: false });
      console.log(`Saved comparison and mistakes screenshot to ${compOut}`);

      // 6. Scroll to Applications (#applications)
      await page.evaluate(() => {
        const el = document.getElementById('applications');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      });
      await new Promise(r => setTimeout(r, 800));
      const appsOut = path.join(ARTIFACT_DIR, `recursion_${vp.name}_applications.png`);
      await page.screenshot({ path: appsOut, fullPage: false });
      console.log(`Saved applications screenshot to ${appsOut}`);

      // 7. Scroll to Practice & Quiz (#practice-and-quiz)
      await page.evaluate(() => {
        const el = document.getElementById('practice-and-quiz');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      });
      await new Promise(r => setTimeout(r, 800));
      const practiceOut = path.join(ARTIFACT_DIR, `recursion_${vp.name}_practice.png`);
      await page.screenshot({ path: practiceOut, fullPage: false });
      console.log(`Saved practice screenshot to ${practiceOut}`);

      // 8. Scroll to Revision (#revision)
      await page.evaluate(() => {
        const el = document.getElementById('revision');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      });
      await new Promise(r => setTimeout(r, 800));
      const revOut = path.join(ARTIFACT_DIR, `recursion_${vp.name}_revision.png`);
      await page.screenshot({ path: revOut, fullPage: false });
      console.log(`Saved revision screenshot to ${revOut}`);
    }

    if (vp.name === 'mobile_390') {
      // Also capture mobile factorial simulator
      await page.evaluate(() => {
        const el = document.getElementById('factorial-simulator');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      });
      await new Promise(r => setTimeout(r, 800));
      const mobFactOut = path.join(ARTIFACT_DIR, `recursion_${vp.name}_factorial.png`);
      await page.screenshot({ path: mobFactOut, fullPage: false });
      console.log(`Saved mobile factorial screenshot to ${mobFactOut}`);
    }
  }

  await browser.close();
  console.log('All recursion screenshots captured successfully!');
}

run().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
