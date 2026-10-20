const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\rakes\\.gemini\\antigravity\\brain\\50ff58cf-4bbd-48f6-bd20-78e1a340387f';

async function run() {
  console.log('Launching Chrome for Right Half Pyramid Lesson verification...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  // Test 1: Full desktop viewport
  console.log('Setting viewport desktop_1600 (1600x1000)...');
  await page.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 1 });

  // Test navigation from /programs
  console.log('Navigating from /programs to lesson...');
  await page.goto('http://localhost:5173/programs', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));

  // Click View Program on Right Half Pyramid
  const viewBtn = await page.$('a[href*="right-half-pyramid"], button[aria-label*="Right Half Pyramid"], .CategoryAccordion_viewBtn__1Y474, [class*="viewBtn"]');
  if (viewBtn) {
    await viewBtn.click();
    await new Promise(r => setTimeout(r, 800));
  } else {
    await page.goto('http://localhost:5173/programs/patterns/right-half-pyramid', { waitUntil: 'networkidle0' });
  }

  await page.goto('http://localhost:5173/programs/patterns/right-half-pyramid', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  // Capture Hero
  const heroOut = path.join(ARTIFACT_DIR, 'pyramid_desktop_1600_hero.png');
  await page.screenshot({ path: heroOut, fullPage: false });
  console.log(`Saved hero screenshot to ${heroOut}`);

  // Scroll to Segment 01 & 02: Understand Problem & Think Like Human
  await page.evaluate(() => {
    const el = document.getElementById('think-like-human');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 800));
  const humanOut = path.join(ARTIFACT_DIR, 'pyramid_desktop_1600_human_thinking.png');
  await page.screenshot({ path: humanOut, fullPage: false });
  console.log(`Saved human thinking screenshot to ${humanOut}`);

  // Scroll to Segment 03 & 04: Give Input & Algorithm
  await page.evaluate(() => {
    const el = document.getElementById('give-input');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 800));
  const inputOut = path.join(ARTIFACT_DIR, 'pyramid_desktop_1600_input_algorithm.png');
  await page.screenshot({ path: inputOut, fullPage: false });
  console.log(`Saved input & algorithm screenshot to ${inputOut}`);

  // Scroll to Segment 05: Flowchart
  await page.evaluate(() => {
    const el = document.getElementById('flowchart-section');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 800));
  const flowOut = path.join(ARTIFACT_DIR, 'pyramid_desktop_1600_flowchart.png');
  await page.screenshot({ path: flowOut, fullPage: false });
  console.log(`Saved flowchart screenshot to ${flowOut}`);

  // Scroll to Segment 06: Source Code
  await page.evaluate(() => {
    const el = document.getElementById('source-code');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 800));
  const codeOut = path.join(ARTIFACT_DIR, 'pyramid_desktop_1600_source_code.png');
  await page.screenshot({ path: codeOut, fullPage: false });
  console.log(`Saved source code screenshot to ${codeOut}`);

  // Scroll to Segment 07: Execution Simulator & step forward 5 times
  await page.evaluate(() => {
    const el = document.getElementById('execution-simulator');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 800));

  // Step forward a few times in simulation
  const nextBtn = await page.$('button[aria-label="Next execution step"]');
  if (nextBtn) {
    for (let i = 0; i < 8; i++) {
      await nextBtn.click();
      await new Promise(r => setTimeout(r, 100));
    }
  }
  await new Promise(r => setTimeout(r, 500));
  const simOut = path.join(ARTIFACT_DIR, 'pyramid_desktop_1600_simulator.png');
  await page.screenshot({ path: simOut, fullPage: false });
  console.log(`Saved simulator screenshot to ${simOut}`);

  // Scroll to Segment 08 & Knowledge Check
  await page.evaluate(() => {
    const el = document.getElementById('knowledge-check');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 800));
  const quizOut = path.join(ARTIFACT_DIR, 'pyramid_desktop_1600_practice_quiz.png');
  await page.screenshot({ path: quizOut, fullPage: false });
  console.log(`Saved quiz screenshot to ${quizOut}`);

  // Test Tablet viewport (768x1024)
  console.log('Setting viewport tablet_768 (768x1024)...');
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 1 });
  await page.goto('http://localhost:5173/programs/patterns/right-half-pyramid', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  const tabletHero = path.join(ARTIFACT_DIR, 'pyramid_tablet_768_hero.png');
  await page.screenshot({ path: tabletHero, fullPage: false });
  console.log(`Saved tablet hero screenshot to ${tabletHero}`);

  // Test Mobile viewport (390x844)
  console.log('Setting viewport mobile_390 (390x844)...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true });
  await page.goto('http://localhost:5173/programs/patterns/right-half-pyramid', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  const mobileHero = path.join(ARTIFACT_DIR, 'pyramid_mobile_390_hero.png');
  await page.screenshot({ path: mobileHero, fullPage: false });
  console.log(`Saved mobile hero screenshot to ${mobileHero}`);

  // Mobile simulator scroll
  await page.evaluate(() => {
    const el = document.getElementById('execution-simulator');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 800));
  const mobileSim = path.join(ARTIFACT_DIR, 'pyramid_mobile_390_simulator.png');
  await page.screenshot({ path: mobileSim, fullPage: false });
  console.log(`Saved mobile simulator screenshot to ${mobileSim}`);

  await browser.close();
  console.log('All Right Half Pyramid screenshots captured successfully!');
}

run().catch((err) => {
  console.error('Error during screenshot capture:', err);
  process.exit(1);
});
