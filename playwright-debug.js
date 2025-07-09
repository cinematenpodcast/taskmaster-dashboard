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
        console.log('Navigating to http://localhost:5173/dependencies ...');
        await page.goto('http://localhost:5173/dependencies', { waitUntil: 'networkidle' });

        // Check for dependency graph visibility
        const dependencyGraph = await page.locator('#dependency-graph');
        if (await dependencyGraph.isVisible()) {
            console.log('SUCCESS: Dependency graph is visible.');
        } else {
            console.error('ERROR: Dependency graph is NOT visible.');
        }

    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
        console.error('Call log:');
        console.error(error.stack);
    } finally {
        console.log('Taking screenshot...');
        await page.screenshot({ path: path.join(__dirname, 'debug-screenshot-dependencies.png') });
        console.log(`Screenshot saved to ${path.join(__dirname, 'debug-screenshot-dependencies.png')}`);
        
        console.log('Closing browser...');
        await browser.close();
    }
})(); 