document.addEventListener('DOMContentLoaded', () => {
    const fileGrid = document.getElementById('file-grid');
    const popup = document.getElementById('popup');
    const popupBackground = document.getElementById('popup-background');
    const closeBtn = document.querySelector('.close');
    const minimizeBtn = document.querySelector('.minimize');
    const videoPlayer = document.getElementById('video-player');
    const audioPlayer = document.getElementById('audio-player');
    const themeToggle = document.getElementById('theme-toggle');
    const homeLink = document.getElementById('home-link');
    const audioLink = document.getElementById('audio-link');
    const videoLink = document.getElementById('video-link');

    let currentTheme = 'dark';

    // Fetch files from the server
    function fetchFiles() {
        fetch('/api/files')
            .then(response => response.json())
            .then(data => {
                renderFiles(data.audio.concat(data.video));
            });
    }

    // Render files in the DOM
    function renderFiles(files) {
        fileGrid.innerHTML = '';
        files.forEach(file => {
            const card = document.createElement('div');
            card.className = 'file-card';
            card.innerHTML = `
                <img src="${file.type === 'video' ? '/video/thumbnail.jpg' : '/audio/thumbnail.jpg'}" alt="${file.name}">
                <p><strong>${file.name}</strong></p>
                <p>Size: ${(file.size / 1024).toFixed(2)} KB</p>
                <p>Uploaded: ${new Date(file.uploadedAt).toLocaleString()}</p>
            `;
            card.onclick = () => openFile(file);
            fileGrid.appendChild(card);
        });
    }

    // Open file in popup
    function openFile(file) {
        if (file.type === 'video') {
            videoPlayer.src = `/video/${file.name}`;
            videoPlayer.style.display = 'block';
            audioPlayer.style.display = 'none';
        } else if (file.type === 'audio') {
            audioPlayer.src = `/audio/${file.name}`;
            audioPlayer.style.display = 'block';
            videoPlayer.style.display = 'none';
        }
        popup.style.display = 'block';
        popupBackground.style.display = 'block';
    }

    // Close popup
    closeBtn.onclick = () => {
        popup.style.display = 'none';
        popupBackground.style.display = 'none';
        videoPlayer.pause();
        audioPlayer.pause();
    };

    // Minimize popup
    minimizeBtn.onclick = () => {
        popup.style.display = 'none';
        popupBackground.style.display = 'none';
        videoPlayer.pause();
        audioPlayer.pause();
    };

    // Theme toggler
    themeToggle.onclick = () => {
        if (currentTheme === 'dark') {
            document.body.classList.add('light-mode');
            currentTheme = 'light';
        } else {
            document.body.classList.remove('light-mode');
            currentTheme = 'dark';
        }
    };

    // Navigation links
    homeLink.onclick = () => fetchFiles();
    audioLink.onclick = () => {
        fetch('/api/files')
            .then(response => response.json())
            .then(data => renderFiles(data.audio));
    };
    videoLink.onclick = () => {
        fetch('/api/files')
            .then(response => response.json())
            .then(data => renderFiles(data.video));
    };

    // Initial load
    fetchFiles();
});