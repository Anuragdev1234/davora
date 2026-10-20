const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\rakes\\.gemini\\antigravity\\brain\\50ff58cf-4bbd-48f6-bd20-78e1a340387f';

async function run() {
  console.log('Launching Chrome for DEVORA Programs Library verification...');
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

    // 1. Visit Programs Library
    await page.goto('http://localhost:5173/programs', {
      waitUntil: 'networkidle0'
    });

    await new Promise(r => setTimeout(r, 1200));

    const libOut = path.join(ARTIFACT_DIR, `programs_${vp.name}_library.png`);
    await page.screenshot({ path: libOut, fullPage: false });
    console.log(`Saved library screenshot to ${libOut}`);

    if (vp.name === 'desktop_1600') {
      // Test search interaction
      console.log('Testing search filter on desktop...');
      const searchInput = await page.$('input[placeholder="Search programs..."]');
      if (searchInput) {
        await searchInput.type('pyramid');
        await new Promise(r => setTimeout(r, 600));
        const searchOut = path.join(ARTIFACT_DIR, `programs_${vp.name}_search.png`);
        await page.screenshot({ path: searchOut, fullPage: false });
        console.log(`Saved search screenshot to ${searchOut}`);
      }

      // 2. Visit Detail page
      console.log('Visiting detail page...');
      await page.goto('http://localhost:5173/programs/patterns/right-half-pyramid', {
        waitUntil: 'networkidle0'
      });
      await new Promise(r => setTimeout(r, 1000));
      const detailOut = path.join(ARTIFACT_DIR, `programs_${vp.name}_detail.png`);
      await page.screenshot({ path: detailOut, fullPage: false });
      console.log(`Saved detail screenshot to ${detailOut}`);
    }

    if (vp.name === 'mobile_390') {
      console.log('Visiting detail page on mobile...');
      await page.goto('http://localhost:5173/programs/patterns/right-half-pyramid', {
        waitUntil: 'networkidle0'
      });
      await new Promise(r => setTimeout(r, 1000));
      const mobileDetailOut = path.join(ARTIFACT_DIR, `programs_${vp.name}_detail.png`);
      await page.screenshot({ path: mobileDetailOut, fullPage: false });
      console.log(`Saved mobile detail screenshot to ${mobileDetailOut}`);
    }
  }

  await browser.close();
  console.log('All Programs Library screenshots captured successfully!');
}

run().catch((err) => {
  console.error('Error during screenshot capture:', err);
  process.exit(1);
});
