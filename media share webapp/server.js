const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Static files serving
app.use(express.static(path.join(__dirname, 'public')));

// Prevent direct file downloads
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
});

// API to fetch audio and video files
app.get('/api/files', (req, res) => {
    const audioPath = path.join(__dirname, 'public', 'audio');
    const videoPath = path.join(__dirname, 'public', 'video');

    const audioFiles = fs.readdirSync(audioPath).map(file => {
        const stats = fs.statSync(path.join(audioPath, file));
        return {
            name: file,
            size: stats.size,
            type: 'audio',
            uploadedAt: stats.mtime
        };
    });

    const videoFiles = fs.readdirSync(videoPath).map(file => {
        const stats = fs.statSync(path.join(videoPath, file));
        return {
            name: file,
            size: stats.size,
            type: 'video',
            uploadedAt: stats.mtime
        };
    });

    res.json({ audio: audioFiles, video: videoFiles });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});