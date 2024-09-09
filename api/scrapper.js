const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

async function scrapeTikTokVideo(url) {
    let browser = null;
    try {
        browser = await puppeteer.launch({
            args: [...chromium.args],
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
        });

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        
        const videoUrl = await page.evaluate(() => {
            const videoElement = document.querySelector('video');
            return videoElement ? videoElement.src : null;
        });

        await browser.close();

        if (!videoUrl) {
            throw new Error('Failed to find video URL.');
        }

        return videoUrl;
    } catch (error) {
        if (browser) {
            await browser.close();
        }
        throw error;
    }
}

module.exports = { scrapeTikTokVideo };
