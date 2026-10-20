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
    { name: 'desktop_1600', width: 1600, height: 950 },
    { name: 'laptop_1280', width: 1280, height: 850 },
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

    await page.goto('http://localhost:5173/#hero', {
      waitUntil: 'networkidle0'
    });

    // Wait for animations to settle
    await new Promise(r => setTimeout(r, 700));

    const outPath = path.join(ARTIFACT_DIR, `home_hero_${vp.name}.png`);
    await page.screenshot({ path: outPath, fullPage: false });
    console.log(`Saved screenshot to ${outPath}`);
  }

  await browser.close();
  console.log('Completed capture of home hero!');
}

run().catch(err => {
  console.error('Error running screenshots:', err);
  process.exit(1);
});
