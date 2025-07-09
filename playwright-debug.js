import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        viewport: { width: 375, height: 667 } // iPhone 6/7/8
    });
    const page = await context.newPage();

    page.on('console', msg => {
        const type = msg.type().toUpperCase();
        if (type === 'LOG' || type === 'WARN' || type === 'ERROR' || type === 'DEBUG' || type === 'INFO') {
            console.log(`[Browser Console]: ${type} - ${msg.text()}`);
        }
    });

    try {
        console.log('Navigating to http://localhost:5173/ ...');
        await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

        // Check the flex-direction of the kanban board
        const kanbanBoard = await page.locator('#kanban-board');
        const flexDirection = await kanbanBoard.evaluate(node => getComputedStyle(node).flexDirection);

        if (flexDirection === 'column') {
            console.log('SUCCESS: Kanban board has a column flex-direction on mobile.');
        } else {
            console.error(`ERROR: Kanban board has a flex-direction of ${flexDirection} on mobile.`);
        }

    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
        console.error('Call log:');
        console.error(error.stack);
    } finally {
        console.log('Taking screenshot...');
        await page.screenshot({ path: path.join(__dirname, 'debug-screenshot-mobile.png') });
        console.log(`Screenshot saved to ${path.join(__dirname, 'debug-screenshot-mobile.png')}`);
        
        console.log('Closing browser...');
        await browser.close();
    }
})(); 