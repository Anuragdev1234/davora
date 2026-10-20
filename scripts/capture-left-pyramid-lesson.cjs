const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\rakes\\.gemini\\antigravity\\brain\\50ff58cf-4bbd-48f6-bd20-78e1a340387f';

async function run() {
  console.log('Launching Chrome for Left Half Pyramid Lesson verification...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  // Test 1: Full desktop viewport
  console.log('Setting viewport desktop_1600 (1600x1000)...');
  await page.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 1 });

  // Test navigation to /programs/patterns/left-half-pyramid
  console.log('Navigating to Left Half Pyramid lesson...');
  await page.goto('http://localhost:5173/programs/patterns/left-half-pyramid', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  // Capture Hero
  const heroOut = path.join(ARTIFACT_DIR, 'left_desktop_1600_hero.png');
  await page.screenshot({ path: heroOut, fullPage: false });
  console.log(`Saved hero screenshot to ${heroOut}`);

  // Scroll to Segment 01 & 02: Understand Problem & Think Like Human
  await page.evaluate(() => {
    const el = document.getElementById('think-like-human');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 800));
  const humanOut = path.join(ARTIFACT_DIR, 'left_desktop_1600_human_thinking.png');
  await page.screenshot({ path: humanOut, fullPage: false });
  console.log(`Saved human thinking screenshot to ${humanOut}`);

  // Scroll to Segment 03 & 04: Give Input & Algorithm
  await page.evaluate(() => {
    const el = document.getElementById('give-input');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 800));
  const inputOut = path.join(ARTIFACT_DIR, 'left_desktop_1600_input_algorithm.png');
  await page.screenshot({ path: inputOut, fullPage: false });
  console.log(`Saved input & algorithm screenshot to ${inputOut}`);

  // Scroll to Segment 05: Flowchart
  await page.evaluate(() => {
    const el = document.getElementById('flowchart-section');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 800));
  const flowOut = path.join(ARTIFACT_DIR, 'left_desktop_1600_flowchart.png');
  await page.screenshot({ path: flowOut, fullPage: false });
  console.log(`Saved flowchart screenshot to ${flowOut}`);

  // Scroll to Segment 06: Source Code
  await page.evaluate(() => {
    const el = document.getElementById('source-code-section');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 800));
  const codeOut = path.join(ARTIFACT_DIR, 'left_desktop_1600_source_code.png');
  await page.screenshot({ path: codeOut, fullPage: false });
  console.log(`Saved source code screenshot to ${codeOut}`);

  // Scroll to Segment 07: Simulator
  await page.evaluate(() => {
    const el = document.getElementById('execution-simulator');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 800));
  const simOut = path.join(ARTIFACT_DIR, 'left_desktop_1600_simulator.png');
  await page.screenshot({ path: simOut, fullPage: false });
  console.log(`Saved simulator screenshot to ${simOut}`);

  // Scroll to Segment 08: Pattern Comparison
  await page.evaluate(() => {
    const el = document.getElementById('pattern-comparison');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 800));
  const compOut = path.join(ARTIFACT_DIR, 'left_desktop_1600_comparison.png');
  await page.screenshot({ path: compOut, fullPage: false });
  console.log(`Saved comparison screenshot to ${compOut}`);

  // Scroll to Segment 09: Quiz
  await page.evaluate(() => {
    const el = document.getElementById('knowledge-check');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 800));
  const quizOut = path.join(ARTIFACT_DIR, 'left_desktop_1600_quiz.png');
  await page.screenshot({ path: quizOut, fullPage: false });
  console.log(`Saved practice quiz screenshot to ${quizOut}`);

  // Test 2: Tablet Viewport (768x1024)
  console.log('Testing tablet viewport 768px...');
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 1 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 600));
  const tabHeroOut = path.join(ARTIFACT_DIR, 'left_tablet_768_hero.png');
  await page.screenshot({ path: tabHeroOut, fullPage: false });
  console.log(`Saved tablet hero screenshot to ${tabHeroOut}`);

  // Test 3: Mobile Viewport (390x844 - iPhone 14)
  console.log('Testing mobile viewport 390px...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 600));
  const mobHeroOut = path.join(ARTIFACT_DIR, 'left_mobile_390_hero.png');
  await page.screenshot({ path: mobHeroOut, fullPage: false });
  console.log(`Saved mobile hero screenshot to ${mobHeroOut}`);

  // Mobile simulator
  await page.evaluate(() => {
    const el = document.getElementById('execution-simulator');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 600));
  const mobSimOut = path.join(ARTIFACT_DIR, 'left_mobile_390_simulator.png');
  await page.screenshot({ path: mobSimOut, fullPage: false });
  console.log(`Saved mobile simulator screenshot to ${mobSimOut}`);

  await browser.close();
  console.log('Left Half Pyramid verification screenshots successfully generated!');
}

run().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
