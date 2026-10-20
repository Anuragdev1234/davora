const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\rakes\\.gemini\\antigravity\\brain\\50ff58cf-4bbd-48f6-bd20-78e1a340387f';

async function run() {
  console.log('Launching Chrome for Experiment verification...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 960 });

  // Go directly to landing page
  console.log('Navigating to http://localhost:5173/?stage=landing ...');
  await page.goto('http://localhost:5173/?stage=landing', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1000));

  // Scroll to #experiment section
  console.log('Scrolling to #experiment section...');
  await page.evaluate(() => {
    const exp = document.getElementById('experiment');
    if (exp) exp.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 800));

  // 1. Check default state & click Run
  console.log('Running default "Hello, Devora!\\n"...');
  await page.evaluate(() => {
    const runBtn = document.getElementById('experimentRunBtn');
    if (runBtn) runBtn.click();
  });
  await new Promise(r => setTimeout(r, 900));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'experiment_01_default_run.png') });
  console.log('Saved experiment_01_default_run.png');

  // 2. Change text inside printf input to custom string
  console.log('Typing custom text inside printf quotes...');
  await page.focus('#printfTextInput');
  await page.keyboard.down('Control');
  await page.keyboard.press('KeyA');
  await page.keyboard.up('Control');
  await page.keyboard.press('Backspace');
  await page.keyboard.type('Welcome to C Programming!\\nSecond Line: Antigravity Logic');
  await new Promise(r => setTimeout(r, 400));

  // Click Run
  await page.evaluate(() => {
    const runBtn = document.getElementById('experimentRunBtn');
    if (runBtn) runBtn.click();
  });
  await new Promise(r => setTimeout(r, 900));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'experiment_02_custom_string_run.png') });
  console.log('Saved experiment_02_custom_string_run.png');

  // 3. Test another custom string with special symbols
  console.log('Testing special characters...');
  await page.focus('#printfTextInput');
  await page.keyboard.down('Control');
  await page.keyboard.press('KeyA');
  await page.keyboard.up('Control');
  await page.keyboard.press('Backspace');
  await page.keyboard.type('Execution: 100% verified | Dynamic Printf Works!');
  await new Promise(r => setTimeout(r, 400));

  await page.evaluate(() => {
    const runBtn = document.getElementById('experimentRunBtn');
    if (runBtn) runBtn.click();
  });
  await new Promise(r => setTimeout(r, 900));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'experiment_03_special_chars_run.png') });
  console.log('Saved experiment_03_special_chars_run.png');

  // 4. Test Reset button
  console.log('Testing reset button...');
  await page.evaluate(() => {
    const resetBtn = document.getElementById('experimentResetBtn');
    if (resetBtn) resetBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'experiment_04_reset.png') });
  console.log('Saved experiment_04_reset.png');

  // 5. Test Full Source mode
  console.log('Testing Full Source mode...');
  await page.evaluate(() => {
    const rawBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Full Source'));
    if (rawBtn) rawBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  await page.evaluate(() => {
    const textarea = document.getElementById('fullCodeTextarea');
    if (textarea) {
      textarea.value = `#include <stdio.h>

int main() {
    printf("Line 1: Compiling custom C code\\n");
    printf("Line 2: Multi-statement standard I/O works!\\n");
    return 0;
}`;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      textarea.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await new Promise(r => setTimeout(r, 300));

  await page.evaluate(() => {
    const runBtn = document.getElementById('experimentRunBtn');
    if (runBtn) runBtn.click();
  });
  await new Promise(r => setTimeout(r, 900));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'experiment_05_full_source_run.png') });
  console.log('Saved experiment_05_full_source_run.png');

  await browser.close();
  console.log('Experiment verification completed successfully!');
}

run().catch(err => {
  console.error('Error running experiment verification:', err);
  process.exit(1);
});
