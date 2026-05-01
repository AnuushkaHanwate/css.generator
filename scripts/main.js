// 1. Get all the UI elements from your HTML
const templateSelector = document.getElementById('templateSelector');
const previewContainer = document.getElementById('target-box');
const cssOutput = document.getElementById('cssOutput');
const bgColorPicker = document.getElementById('bgColorPicker');
const roundingSlider = document.getElementById('roundingSlider'); // New ID
const fontSizeSlider = document.getElementById('fontSizeSlider');

// 2. Define the layouts
const templates = {
    grid: {
        html: '<div style="display:grid; grid-template-columns:repeat(3,1fr); gap:10px;"><div>1</div><div>2</div><div>3</div></div>',
        css: (color, round, font) => `display: grid;\ngrid-template-columns: repeat(3, 1fr);\ngap: 10px;\nbackground-color: ${color};\nborder-radius: ${round}px;\nfont-size: ${font}px;`
    },
    column: {
        html: '<div style="display:flex; gap:10px;"><div>Left</div><div>Right</div></div>',
        css: (color, round, font) => `display: flex;\ngap: 15px;\nbackground-color: ${color};\nborder-radius: ${round}px;\nfont-size: ${font}px;`
    },
    card: {
        html: '<div style="padding:10px;"><h3>Card Title</h3><p>Description text.</p></div>',
        css: (color, round, font) => `padding: 15px;\nbackground-color: ${color};\nborder-radius: ${round}px;\nfont-size: ${font}px;`
    }
};

// 3. The "Update Everything" function
function updateAll() {
    const selected = templateSelector.value;
    const color = bgColorPicker.value;
    const round = roundingSlider.value;
    const font = fontSizeSlider.value;

    // Update the visual Preview
    previewContainer.innerHTML = templates[selected].html;
    previewContainer.style.backgroundColor = color;
    previewContainer.style.borderRadius = round + 'px'; // This makes it curve!
    previewContainer.style.fontSize = font + 'px';
    
    // Update the Code Box
    cssOutput.textContent = templates[selected].css(color, round, font);
}

// 4. Listen for changes on all inputs
[templateSelector, bgColorPicker, roundingSlider, fontSizeSlider].forEach(item => {
    item.addEventListener('input', updateAll);
});

// Run once on startup to set the initial look
updateAll();

// Copy function
function copyCSS() {
    navigator.clipboard.writeText(cssOutput.textContent);
    alert("CSS Copied to Clipboard!");
}