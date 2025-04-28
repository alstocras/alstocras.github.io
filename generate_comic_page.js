const fs = require('fs');
const path = require('path');

// Load titles.json
const titlesPath = './titles.json';
const titles = JSON.parse(fs.readFileSync(titlesPath, 'utf8'));

// Get the latest comic info
const latestComic = titles[0]; // Newest comic is first
const comicNumber = titles.length; // Latest comic number
const comicFileName = `comic${comicNumber}.html`;

// Create the HTML page for the new comic
const newComicPage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>${latestComic.title} - qzrnw</title>
    <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
    <div class="navbar">
        <a href="index.html">Home</a>
        <a href="archive.html">Archive</a>
    </div>
    <div id="comic-container">
        <div class="container">
            <h1>${latestComic.title}</h1>
            <img src="${latestComic.file}" title="${latestComic.hover}" alt="${latestComic.title}" style="width: 500px; max-width: 100%; height: auto;">
        </div>
        <div class="navigation-buttons">
            <!-- Previous Button -->
            <button onclick="window.location.href='comic${comicNumber - 1}.html'" ${comicNumber === 1 ? 'disabled' : ''}>Previous</button>

            <!-- Next Button -->
            <button onclick="window.location.href='comic${comicNumber + 1}.html'">Next</button>
        </div>
    </div>
</body>
</html>
`;

// Write the new comic HTML file to the root directory (no /comics/)
fs.writeFileSync(path.join(__dirname, comicFileName), newComicPage);

// Update the archive
const archivePath = './archive.html';
let archiveContent = fs.readFileSync(archivePath, 'utf8');

// Generate new archive list dynamically from titles.json
const archiveListHTML = titles.map((comic, idx) => {
    const number = titles.length - idx;
    return `<li><a href="comic${number}.html" class="button-a">${comic.title}</a></li>`;
}).join('\n');

// Replace the whole <ol>...</ol> section in the archive
archiveContent = archiveContent.replace(
    /<ol[^>]*>[\s\S]*?<\/ol>/,
    `<ol reversed>\n${archiveListHTML}\n</ol>`
);

// Save updated archive.html
fs.writeFileSync(archivePath, archiveContent);

console.log(`Comic ${comicNumber} generated and archive updated!`);
