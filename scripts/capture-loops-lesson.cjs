const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\rakes\\.gemini\\antigravity\\brain\\50ff58cf-4bbd-48f6-bd20-78e1a340387f';

async function run() {
  console.log('Launching Chrome for Loops in C verification...');
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

    await page.goto('http://localhost:5173/theory/basics/loops-in-c', {
      waitUntil: 'networkidle0'
    });

    // Wait for animations and layout
    await new Promise(r => setTimeout(r, 1000));

    // Capture hero
    const heroOut = path.join(ARTIFACT_DIR, `loops_${vp.name}_hero.png`);
    await page.screenshot({ path: heroOut, fullPage: false });
    console.log(`Saved hero screenshot to ${heroOut}`);

    if (vp.name === 'desktop_1600') {
      // 1. Scroll to Flowchart & Loop Types (#loop-flow-overview)
      await page.evaluate(() => {
        const el = document.getElementById('loop-flow-overview');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 800));
      const flowOut = path.join(ARTIFACT_DIR, `loops_${vp.name}_flow_types.png`);
      await page.screenshot({ path: flowOut, fullPage: false });
      console.log(`Saved flow & types screenshot to ${flowOut}`);

      // 2. Scroll to Loop Time Machine (#loop-time-machine)
      await page.evaluate(() => {
        const el = document.getElementById('loop-time-machine');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 800));

      // Advance Time Machine by 2 steps using the Next button
      await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const nextBtn = buttons.find(b => b.textContent && b.textContent.includes('Next'));
        if (nextBtn) {
          nextBtn.click();
          setTimeout(() => nextBtn.click(), 200);
        }
      });
      await new Promise(r => setTimeout(r, 600));

      const timeMachineOut = path.join(ARTIFACT_DIR, `loops_${vp.name}_time_machine.png`);
      await page.screenshot({ path: timeMachineOut, fullPage: false });
      console.log(`Saved time machine screenshot to ${timeMachineOut}`);

      // 3. Scroll to Individual Loops (#individual-loops)
      await page.evaluate(() => {
        const el = document.getElementById('individual-loops');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 800));

      // Interactive: move slider to 7
      await page.evaluate(() => {
        const slider = document.querySelector('input[type="range"]');
        if (slider) {
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          nativeInputValueSetter.call(slider, '7');
          slider.dispatchEvent(new Event('input', { bubbles: true }));
          slider.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
      await new Promise(r => setTimeout(r, 500));

      const individualOut = path.join(ARTIFACT_DIR, `loops_${vp.name}_individual_loops.png`);
      await page.screenshot({ path: individualOut, fullPage: false });
      console.log(`Saved individual loops screenshot to ${individualOut}`);

      // 4. Scroll to Nested Loops & Flow Control (#nested-and-flow-control)
      await page.evaluate(() => {
        const el = document.getElementById('nested-and-flow-control');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 800));

      // Click step forward on nested star grid
      await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const stepBtn = buttons.find(b => b.textContent && b.textContent.includes('Step Forward'));
        if (stepBtn) {
          stepBtn.click();
          setTimeout(() => stepBtn.click(), 150);
          setTimeout(() => stepBtn.click(), 300);
        }
      });
      await new Promise(r => setTimeout(r, 600));

      const nestedOut = path.join(ARTIFACT_DIR, `loops_${vp.name}_nested_flow.png`);
      await page.screenshot({ path: nestedOut, fullPage: false });
      console.log(`Saved nested & flow control screenshot to ${nestedOut}`);

      // 5. Scroll to Differences & Common Mistakes (#differences-and-mistakes)
      await page.evaluate(() => {
        const el = document.getElementById('differences-and-mistakes');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 800));

      // Toggle first mistake card to "Fixed Code"
      await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const fixBtn = buttons.find(b => b.textContent && b.textContent.includes('Fixed Code'));
        if (fixBtn) fixBtn.click();
      });
      await new Promise(r => setTimeout(r, 500));

      const diffMistakesOut = path.join(ARTIFACT_DIR, `loops_${vp.name}_differences_mistakes.png`);
      await page.screenshot({ path: diffMistakesOut, fullPage: false });
      console.log(`Saved differences & mistakes screenshot to ${diffMistakesOut}`);

      // 6. Scroll to Practice & Challenges (#practice-and-challenges)
      await page.evaluate(() => {
        const el = document.getElementById('practice-and-challenges');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 800));

      // Answer first quiz question: click option index 2 ("do-while")
      await page.evaluate(() => {
        const optionButtons = Array.from(document.querySelectorAll('button')).filter(b => 
          b.textContent && (b.textContent.includes('do-while') || b.textContent.includes('while') || b.textContent.includes('for'))
        );
        const targetBtn = optionButtons.find(b => b.textContent && b.textContent.includes('do-while'));
        if (targetBtn) targetBtn.click();
      });
      await new Promise(r => setTimeout(r, 600));

      const practiceOut = path.join(ARTIFACT_DIR, `loops_${vp.name}_practice_challenges.png`);
      await page.screenshot({ path: practiceOut, fullPage: false });
      console.log(`Saved practice & challenges screenshot to ${practiceOut}`);

      // 7. Scroll to Completion Nav (#loops-completion)
      await page.evaluate(() => {
        const el = document.getElementById('loops-completion');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 800));

      const completionOut = path.join(ARTIFACT_DIR, `loops_${vp.name}_completion.png`);
      await page.screenshot({ path: completionOut, fullPage: false });
      console.log(`Saved completion screenshot to ${completionOut}`);
    }
  }

  await browser.close();
  console.log('All screenshots captured successfully.');
}

run().catch(err => {
  console.error('Error running capture script:', err);
  process.exit(1);
});
