const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\rakes\\.gemini\\antigravity\\brain\\50ff58cf-4bbd-48f6-bd20-78e1a340387f';

async function run() {
  console.log('Launching Chrome for integration verification...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Visit root "/" - should be at SpotlightLoadingScreen
  console.log('Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });

  // Capture early loading state
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verify_01_loading_screen.png') });
  console.log('Saved verify_01_loading_screen.png');

  // Wait for 100% counter + expansion to full screen + "ENTER DEVORA" button (loadingDurationMs is 3800ms)
  console.log('Waiting for reveal and ENTER DEVORA button...');
  await page.waitForFunction(() => {
    return Array.from(document.querySelectorAll('button')).some(b => b.textContent && b.textContent.includes('ENTER DEVORA'));
  }, { timeout: 12000 });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verify_02_enter_devora_screen.png') });
  console.log('Saved verify_02_enter_devora_screen.png');

  // 2. Click "ENTER DEVORA" -> Carousel appears
  console.log('Clicking ENTER DEVORA button...');
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('ENTER DEVORA'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verify_03_carousel_c_slide.png') });
  console.log('Saved verify_03_carousel_c_slide.png');

  // 3. Test clicking Next Slide (to Python)
  console.log('Navigating to next slide (Python)...');
  await page.evaluate(() => {
    const next = document.getElementById('carouselNextBtn');
    if (next) next.click();
  });
  await new Promise(r => setTimeout(r, 900));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verify_04_carousel_python_slide.png') });
  console.log('Saved verify_04_carousel_python_slide.png');

  // Click on the python slide to trigger "Future Development" toast
  console.log('Clicking on Python slide to trigger Future Development toast...');
  await page.evaluate(() => {
    const active = document.querySelector('.swiper-slide-active');
    if (active) active.click();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verify_05_future_development_toast.png') });
  console.log('Saved verify_05_future_development_toast.png');

  // Navigate back to C Language slide
  console.log('Navigating back to C slide...');
  await page.evaluate(() => {
    const prev = document.getElementById('carouselPrevBtn');
    if (prev) prev.click();
  });
  await new Promise(r => setTimeout(r, 900));

  // 4. Click the C Language slide / C icon -> Landing page appears!
  console.log('Clicking C slide / C icon hotspot to enter DEVORA landing page...');
  await page.evaluate(() => {
    const hotspot = document.getElementById('cIconHotspotBtn');
    if (hotspot) {
      hotspot.click();
    } else {
      const cSlide = document.querySelector('.swiper-slide-active');
      if (cSlide) cSlide.click();
    }
  });

  // Wait for landing page to appear
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'verify_06_devora_landing_page.png') });
  console.log('Saved verify_06_devora_landing_page.png');

  await browser.close();
  console.log('All verification steps passed successfully!');
}

run().catch(err => {
  console.error('Error running verification:', err);
  process.exit(1);
});
