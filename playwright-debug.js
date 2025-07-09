import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

// Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Listen for all console events and log them to the terminal
  page.on('console', msg => {
    console.log(`[Browser Console]: ${msg.type().toUpperCase()} - ${msg.text()}`);
  });

  try {
    console.log('Navigating to http://localhost:5173/ ...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

    console.log('Taking screenshot...');
    const screenshotPath = path.join(__dirname, 'debug-screenshot.png');
    await page.screenshot({ path: screenshotPath });
    console.log(`Screenshot saved to ${screenshotPath}`);

  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  } finally {
    console.log('Closing browser...');
    await browser.close();
  }
})(); 