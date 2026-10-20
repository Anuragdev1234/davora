const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\rakes\\.gemini\\antigravity\\brain\\50ff58cf-4bbd-48f6-bd20-78e1a340387f';

async function run() {
  console.log('Launching Chrome for Functions in C verification...');
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

    await page.goto('http://localhost:5173/theory/basics/functions', {
      waitUntil: 'networkidle0'
    });

    // Wait for animations and layout
    await new Promise(r => setTimeout(r, 1000));

    // Capture hero
    const heroOut = path.join(ARTIFACT_DIR, `functions_${vp.name}_hero.png`);
    await page.screenshot({ path: heroOut, fullPage: false });
    console.log(`Saved hero screenshot to ${heroOut}`);

    if (vp.name === 'desktop_1600') {
      // 1. Scroll to Basics (#function-basics)
      await page.evaluate(() => {
        const el = document.getElementById('function-basics');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      });
      await new Promise(r => setTimeout(r, 800));
      const basicsOut = path.join(ARTIFACT_DIR, `functions_${vp.name}_basics.png`);
      await page.screenshot({ path: basicsOut, fullPage: false });
      console.log(`Saved basics screenshot to ${basicsOut}`);

      // 2. Scroll to Function Call Visualizer (#visual-function-flow)
      await page.evaluate(() => {
        const el = document.getElementById('visual-function-flow');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      });
      await new Promise(r => setTimeout(r, 800));

      // Advance Visualizer by 2 steps using the Next button
      await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const nextBtn = buttons.find(b => b.textContent && b.textContent.includes('Next'));
        if (nextBtn) {
          nextBtn.click();
          setTimeout(() => nextBtn.click(), 250);
        }
      });
      await new Promise(r => setTimeout(r, 700));

      const visualizerOut = path.join(ARTIFACT_DIR, `functions_${vp.name}_call_visualizer.png`);
      await page.screenshot({ path: visualizerOut, fullPage: false });
      console.log(`Saved call visualizer screenshot to ${visualizerOut}`);

      // 3. Scroll to Deep Curriculum (#deep-function-curriculum)
      await page.evaluate(() => {
        const el = document.getElementById('deep-function-curriculum');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      });
      await new Promise(r => setTimeout(r, 800));
      const deepOut = path.join(ARTIFACT_DIR, `functions_${vp.name}_deep_curriculum.png`);
      await page.screenshot({ path: deepOut, fullPage: false });
      console.log(`Saved deep curriculum screenshot to ${deepOut}`);

      // 4. Scroll to Recursion & Stack (#recursion-and-stack)
      await page.evaluate(() => {
        const el = document.getElementById('recursion-and-stack');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      });
      await new Promise(r => setTimeout(r, 800));

      // Interact with counter button in memory section
      await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const counterBtn = buttons.find(b => b.textContent && b.textContent.includes('Call counter()'));
        if (counterBtn) {
          counterBtn.click();
          setTimeout(() => counterBtn.click(), 200);
        }
      });
      await new Promise(r => setTimeout(r, 600));

      const recStackOut = path.join(ARTIFACT_DIR, `functions_${vp.name}_recursion_stack.png`);
      await page.screenshot({ path: recStackOut, fullPage: false });
      console.log(`Saved recursion & stack screenshot to ${recStackOut}`);

      // 5. Scroll to Practice & Challenges (#practice-and-challenges)
      await page.evaluate(() => {
        const el = document.getElementById('practice-and-challenges');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      });
      await new Promise(r => setTimeout(r, 800));
      const practiceOut = path.join(ARTIFACT_DIR, `functions_${vp.name}_practice_challenges.png`);
      await page.screenshot({ path: practiceOut, fullPage: false });
      console.log(`Saved practice & challenges screenshot to ${practiceOut}`);

      // 6. Scroll to Completion Nav (#functions-completion)
      await page.evaluate(() => {
        const el = document.getElementById('functions-completion');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      });
      await new Promise(r => setTimeout(r, 800));
      const completionOut = path.join(ARTIFACT_DIR, `functions_${vp.name}_completion.png`);
      await page.screenshot({ path: completionOut, fullPage: false });
      console.log(`Saved completion screenshot to ${completionOut}`);
    }
  }

  await browser.close();
  console.log('All functions screenshots captured successfully!');
}

run().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
