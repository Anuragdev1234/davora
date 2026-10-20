const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\rakes\\.gemini\\antigravity\\brain\\50ff58cf-4bbd-48f6-bd20-78e1a340387f';

async function run() {
  console.log('Launching Chrome for Conditional Statements in C verification...');
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

    await page.goto('http://localhost:5173/theory/basics/conditional-statements', {
      waitUntil: 'networkidle0'
    });

    // Wait for animations and layout
    await new Promise(r => setTimeout(r, 800));

    // Capture hero
    const heroOut = path.join(ARTIFACT_DIR, `conditional_${vp.name}_hero.png`);
    await page.screenshot({ path: heroOut, fullPage: false });
    console.log(`Saved hero screenshot to ${heroOut}`);

    if (vp.name === 'desktop_1600') {
      // 1. Interactive Slider: Change marks to 65 (Grade C)
      await page.evaluate(() => {
        const slider = document.querySelector('input[type="range"]');
        if (slider) {
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          nativeInputValueSetter.call(slider, '65');
          slider.dispatchEvent(new Event('input', { bubbles: true }));
          slider.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
      await new Promise(r => setTimeout(r, 600));
      const marks65Out = path.join(ARTIFACT_DIR, `conditional_${vp.name}_hero_marks_65.png`);
      await page.screenshot({ path: marks65Out, fullPage: false });
      console.log(`Saved marks=65 screenshot to ${marks65Out}`);

      // Reset marks to 85
      await page.evaluate(() => {
        const slider = document.querySelector('input[type="range"]');
        if (slider) {
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          nativeInputValueSetter.call(slider, '85');
          slider.dispatchEvent(new Event('input', { bubbles: true }));
          slider.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
      await new Promise(r => setTimeout(r, 400));

      // 2. Scroll to 6-column examples grid (#conditional-examples)
      await page.evaluate(() => {
        const el = document.getElementById('conditional-examples');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 700));
      const examplesOut = path.join(ARTIFACT_DIR, `conditional_${vp.name}_examples.png`);
      await page.screenshot({ path: examplesOut, fullPage: false });
      console.log(`Saved examples screenshot to ${examplesOut}`);

      // 3. Scroll to Differences Table (#conditional-differences)
      await page.evaluate(() => {
        const el = document.getElementById('conditional-differences');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 700));
      const differencesOut = path.join(ARTIFACT_DIR, `conditional_${vp.name}_differences.png`);
      await page.screenshot({ path: differencesOut, fullPage: false });
      console.log(`Saved differences screenshot to ${differencesOut}`);

      // 4. Scroll to Interactive Practice (#conditional-practice)
      await page.evaluate(() => {
        const el = document.getElementById('conditional-practice');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 700));
      const practiceOut = path.join(ARTIFACT_DIR, `conditional_${vp.name}_practice.png`);
      await page.screenshot({ path: practiceOut, fullPage: false });
      console.log(`Saved practice screenshot to ${practiceOut}`);

      // 5. Interact with Practice: Select Option B ("Output: \"B\"") and click Check Answer
      await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const optB = buttons.find(b => b.textContent && b.textContent.includes('Output: "B"'));
        if (optB) {
          optB.click();
        }
      });
      await new Promise(r => setTimeout(r, 400));
      await page.evaluate(() => {
        const checkBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Check Answer'));
        if (checkBtn) {
          checkBtn.click();
        }
      });
      await new Promise(r => setTimeout(r, 600));
      const practiceAnsweredOut = path.join(ARTIFACT_DIR, `conditional_${vp.name}_practice_answered.png`);
      await page.screenshot({ path: practiceAnsweredOut, fullPage: false });
      console.log(`Saved practice answered screenshot to ${practiceAnsweredOut}`);

      // 6. Scroll to Completion & Takeaways (#conditional-completion)
      await page.evaluate(() => {
        const el = document.getElementById('conditional-completion');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 700));
      const completionOut = path.join(ARTIFACT_DIR, `conditional_${vp.name}_completion.png`);
      await page.screenshot({ path: completionOut, fullPage: false });
      console.log(`Saved completion screenshot to ${completionOut}`);
    }
  }

  await browser.close();
  console.log('Visual verification complete!');
}

run().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
