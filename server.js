const express = require('express');
const { scrapeTikTokVideo } = require('./api/scrapper');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/download', async (req, res) => {
    const tiktokUrl = req.query.url;

    if (!tiktokUrl) {
        return res.status(400).json({ error: 'URL TikTok tidak ditemukan' });
    }

    try {
        const videoUrl = await scrapeTikTokVideo(tiktokUrl);
        res.json({ videoUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`TikTok Downloader berjalan di http://localhost:${port}`);
});
