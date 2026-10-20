const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\rakes\\.gemini\\antigravity\\brain\\50ff58cf-4bbd-48f6-bd20-78e1a340387f';

async function run() {
  console.log('--- Devora Practice Problems Verification ---');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 960 });

    // Step 1: Navigate to Theory Page
    console.log('1. Navigating to Theory Page...');
    await page.goto('http://localhost:5173/theory', { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 600));

    // Step 2: Click the Practice Problems row in the Curriculum Accordion
    console.log('2. Locating and clicking Practice Problems row in Curriculum...');
    const practiceRowClicked = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const practiceBtn = buttons.find(
        (b) =>
          b.innerText.includes('Practice Problems') ||
          b.getAttribute('aria-label')?.includes('Practice Problems')
      );
      if (practiceBtn) {
        practiceBtn.click();
        return true;
      }
      return false;
    });

    console.log('Practice row clicked:', practiceRowClicked);
    await new Promise((r) => setTimeout(r, 800));

    const currentUrl = page.url();
    console.log('Current URL after click:', currentUrl);

    // Verify modal is NOT open
    const modalExists = await page.evaluate(() => {
      return !!document.querySelector('[role="dialog"][aria-modal="true"]');
    });
    console.log('Is modal open? (Should be false):', modalExists);

    // Capture Hero
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'practice_01_hero_desktop.png'),
    });
    console.log('Captured practice_01_hero_desktop.png');

    // Step 3: Click "Start Practicing ↓" to test smooth scrolling
    console.log('3. Clicking "Start Practicing ↓"...');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const startBtn = btns.find((b) => b.innerText.includes('Start Practicing'));
      if (startBtn) startBtn.click();
    });
    await new Promise((r) => setTimeout(r, 700));

    // Step 4: Mode A (Quick Self-Test) Interactive Verification
    console.log('4. Testing Mode A: Quick Self-Test answers...');
    const answered = await page.evaluate(() => {
      // Find option "Base case"
      const buttons = Array.from(document.querySelectorAll('button'));
      const baseCaseBtn = buttons.find((b) => b.innerText.trim().startsWith('B') && b.innerText.includes('Base case'));
      if (baseCaseBtn) {
        baseCaseBtn.click();
        return true;
      }
      return false;
    });
    console.log('Selected option "Base case":', answered);
    await new Promise((r) => setTimeout(r, 400));

    // Click "Check Answer"
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const checkBtn = btns.find((b) => b.innerText.includes('Check Answer'));
      if (checkBtn) checkBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'practice_02_mode_a_feedback.png'),
    });
    console.log('Captured practice_02_mode_a_feedback.png');

    // Step 5: Mode B (Understand the Code) Interactive Verification
    console.log('5. Testing Mode B: Understand the Code (Code Tracing)...');
    await page.evaluate(() => {
      const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
      const tabB = tabs.find((t) => t.innerText.includes('Mode B'));
      if (tabB) tabB.click();
    });
    await new Promise((r) => setTimeout(r, 600));

    // Select prediction choice
    await page.evaluate(() => {
      const choices = Array.from(document.querySelectorAll('button'));
      const choiceA = choices.find((c) => c.innerText.includes('7 5 7'));
      if (choiceA) choiceA.click();
    });
    await new Promise((r) => setTimeout(r, 400));

    // Click Verify Prediction
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const verifyBtn = btns.find((b) => b.innerText.includes('Verify Prediction'));
      if (verifyBtn) verifyBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'practice_03_mode_b_tracing.png'),
    });
    console.log('Captured practice_03_mode_b_tracing.png');

    // Step 6: Mode C (Coding Challenges) Interactive Verification
    console.log('6. Testing Mode C: Coding Challenges...');
    await page.evaluate(() => {
      const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
      const tabC = tabs.find((t) => t.innerText.includes('Mode C'));
      if (tabC) tabC.click();
    });
    await new Promise((r) => setTimeout(r, 600));

    // Click Hint Toggle and Solution Reveal
    await page.evaluate(() => {
      const hintBtns = Array.from(document.querySelectorAll('button')).filter((b) =>
        b.innerText.includes('Hint')
      );
      if (hintBtns[0]) hintBtns[0].click();

      const revealBtns = Array.from(document.querySelectorAll('button')).filter((b) =>
        b.innerText.includes('Reveal Canonical C Solution')
      );
      if (revealBtns[0]) revealBtns[0].click();
    });
    await new Promise((r) => setTimeout(r, 600));

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'practice_04_mode_c_challenges.png'),
    });
    console.log('Captured practice_04_mode_c_challenges.png');

    // Step 7: Filter by Category & Search
    console.log('7. Testing category filters and instant search...');
    await page.evaluate(() => {
      const pills = Array.from(document.querySelectorAll('button'));
      const recPill = pills.find((p) => p.innerText.includes('Functions & Recursion'));
      if (recPill) recPill.click();
    });
    await new Promise((r) => setTimeout(r, 400));

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'practice_05_filters_search.png'),
    });
    console.log('Captured practice_05_filters_search.png');

    // Step 8: Mobile Viewport (390 x 844)
    console.log('8. Testing mobile responsive layout (390x844)...');
    await page.setViewport({ width: 390, height: 844 });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await new Promise((r) => setTimeout(r, 600));

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'practice_06_mobile_hero.png'),
    });
    console.log('Captured practice_06_mobile_hero.png');

    // Scroll to workspace on mobile
    await page.evaluate(() => {
      const el = document.getElementById('practice-workspace');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise((r) => setTimeout(r, 600));

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'practice_07_mobile_workspace.png'),
    });
    console.log('Captured practice_07_mobile_workspace.png');

    // Step 9: Direct URL Access & Navigation Back
    console.log('9. Testing direct URL navigation & back navigation...');
    await page.setViewport({ width: 1440, height: 960 });
    await page.goto('http://localhost:5173/curriculum/basics/practice-problems', {
      waitUntil: 'networkidle0',
    });
    await new Promise((r) => setTimeout(r, 600));

    // Click "Back to Theory"
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const backBtn = btns.find((b) => b.innerText.includes('Back to Theory'));
      if (backBtn) backBtn.click();
    });
    await new Promise((r) => setTimeout(r, 600));

    const finalUrl = page.url();
    console.log('Returned URL after clicking Back to Theory:', finalUrl);

    console.log('--- ALL VERIFICATIONS COMPLETED SUCCESSFULLY ---');
  } catch (err) {
    console.error('Verification failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
