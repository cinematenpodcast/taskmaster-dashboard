import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    page.on('console', msg => {
        const type = msg.type().toUpperCase();
        if (type === 'LOG' || type === 'WARN' || type === 'ERROR' || type === 'DEBUG' || type === 'INFO') {
            console.log(`[Browser Console]: ${type} - ${msg.text()}`);
        }
    });

    try {
        console.log('Navigating to http://localhost:5173/ ...');
        await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

        // Check for Kanban board visibility
        const kanbanBoard = await page.locator('#kanban-board');
        if (await kanbanBoard.isVisible()) {
            console.log('SUCCESS: Kanban board is visible.');
        } else {
            console.error('ERROR: Kanban board is NOT visible.');
        }

    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
        console.error('Call log:');
        console.error(error.stack);
    } finally {
        console.log('Taking screenshot...');
        await page.screenshot({ path: path.join(__dirname, 'debug-screenshot.png') });
        console.log(`Screenshot saved to ${path.join(__dirname, 'debug-screenshot.png')}`);
        
        console.log('Closing browser...');
        await browser.close();
    }
})(); 