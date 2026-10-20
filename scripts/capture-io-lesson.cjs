const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\rakes\\.gemini\\antigravity\\brain\\50ff58cf-4bbd-48f6-bd20-78e1a340387f';

async function run() {
  console.log('Launching Chrome for Input and Output Lesson visual verification...');
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

    await page.goto('http://localhost:5173/theory/basics/input-and-output', {
      waitUntil: 'networkidle0'
    });

    // Wait for animations and layout
    await new Promise(r => setTimeout(r, 800));

    // Capture hero
    const heroOut = path.join(ARTIFACT_DIR, `io_${vp.name}_hero.png`);
    await page.screenshot({ path: heroOut, fullPage: false });
    console.log(`Saved hero screenshot to ${heroOut}`);

    if (vp.name === 'desktop_1600') {
      // 1. Test input '7 8' and verify Sum = 15
      await page.evaluate(() => {
        const inputField = document.querySelector('input[placeholder*="two integers"]');
        if (inputField) {
          // Native value setter to trigger React synthetic event
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          nativeInputValueSetter.call(inputField, '7 8');
          inputField.dispatchEvent(new Event('input', { bubbles: true }));
        }
      });
      await new Promise(r => setTimeout(r, 600));
      const test78Out = path.join(ARTIFACT_DIR, `io_${vp.name}_input_7_8.png`);
      await page.screenshot({ path: test78Out, fullPage: false });
      console.log(`Saved 7 8 input screenshot to ${test78Out}`);

      // 2. Test invalid input 'abc' and verify Invalid input
      await page.evaluate(() => {
        const inputField = document.querySelector('input[placeholder*="two integers"]');
        if (inputField) {
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          nativeInputValueSetter.call(inputField, 'abc');
          inputField.dispatchEvent(new Event('input', { bubbles: true }));
        }
      });
      await new Promise(r => setTimeout(r, 600));
      const testInvalidOut = path.join(ARTIFACT_DIR, `io_${vp.name}_input_invalid.png`);
      await page.screenshot({ path: testInvalidOut, fullPage: false });
      console.log(`Saved invalid input screenshot to ${testInvalidOut}`);

      // Reset to 10 20
      await page.evaluate(() => {
        const inputField = document.querySelector('input[placeholder*="two integers"]');
        if (inputField) {
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          nativeInputValueSetter.call(inputField, '10 20');
          inputField.dispatchEvent(new Event('input', { bubbles: true }));
        }
      });
      await new Promise(r => setTimeout(r, 500));

      // 3. Scroll to Common I/O Functions (01–05)
      await page.evaluate(() => {
        const el = document.getElementById('common-io-functions');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 600));
      const functionsOut = path.join(ARTIFACT_DIR, `io_${vp.name}_functions.png`);
      await page.screenshot({ path: functionsOut, fullPage: false });
      console.log(`Saved functions screenshot to ${functionsOut}`);

      // 4. Scroll to Format Specifiers and Complete Flow
      await page.evaluate(() => {
        const el = document.getElementById('format-specifiers-and-flow');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 600));
      const specFlowOut = path.join(ARTIFACT_DIR, `io_${vp.name}_specifiers_flow.png`);
      await page.screenshot({ path: specFlowOut, fullPage: false });
      console.log(`Saved specifiers & flow screenshot to ${specFlowOut}`);

      // 5. Scroll to Manuscript & Compilable Program
      await page.evaluate(() => {
        const el = document.getElementById('complete-compilable-program');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 600));
      const manuscriptOut = path.join(ARTIFACT_DIR, `io_${vp.name}_manuscript.png`);
      await page.screenshot({ path: manuscriptOut, fullPage: false });
      console.log(`Saved manuscript screenshot to ${manuscriptOut}`);

      // 6. Scroll to Quiz Section
      await page.evaluate(() => {
        const el = document.getElementById('io-quiz');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 600));
      const quizOut = path.join(ARTIFACT_DIR, `io_${vp.name}_quiz.png`);
      await page.screenshot({ path: quizOut, fullPage: false });
      console.log(`Saved quiz screenshot to ${quizOut}`);
    }
  }

  await browser.close();
  console.log('All I/O screenshots captured successfully!');
}

run().catch((err) => {
  console.error('Error during screenshot capture:', err);
  process.exit(1);
});
