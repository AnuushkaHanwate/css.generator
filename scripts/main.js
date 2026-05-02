// 1. Get all the UI elements
const templateSelector = document.getElementById('templateSelector');
const previewContainer = document.getElementById('target-box');
const cssOutput = document.getElementById('cssOutput');
const bgColorPicker = document.getElementById('bgColorPicker');
const roundingSlider = document.getElementById('roundingSlider');
const fontSizeSlider = document.getElementById('fontSizeSlider');
const copyBtn = document.getElementById('copyBtn');

// 2. Define the layout templates
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
    previewContainer.style.borderRadius = round + 'px'; 
    previewContainer.style.fontSize = font + 'px';
    
    // Update the Code Box
    cssOutput.textContent = templates[selected].css(color, round, font);
}

// 4. Listen for changes on all inputs
[templateSelector, bgColorPicker, roundingSlider, fontSizeSlider].forEach(item => {
    item.addEventListener('input', updateAll);
});

// 5. Week 6: Professional Clipboard Logic
copyBtn.addEventListener('click', () => {
    const codeToCopy = cssOutput.textContent;

    // Using the modern Navigator API (Week 6 requirement)
    navigator.clipboard.writeText(codeToCopy).then(() => {
        // Visual feedback
        copyBtn.textContent = "✓ Copied!";
        copyBtn.style.background = "#28a745"; 
        copyBtn.style.color = "white";

        // Reset after 2 seconds
        setTimeout(() => {
            copyBtn.textContent = "Copy to Clipboard";
            copyBtn.style.background = ""; 
            copyBtn.style.color = "";
        }, 2000);
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
});

// Run once on startup
updateAll();