// import imglyRemoveBackground from "@imgly/background-removal"; -> Removed
// Dynamic import used in processImage instead

// DOM Elements
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const browseBtn = document.getElementById('browse-btn');
const filenameSpan = document.getElementById('filename');
const downloadBtn = document.getElementById('download-btn');

// Preview Section Elements
const previewPlaceholder = document.getElementById('preview-placeholder');
const compareContainer = document.getElementById('compare-container');
const previewControls = document.getElementById('preview-controls');

// Comparison Elements
const originalPreview = document.getElementById('original-preview');
const resultPreview = document.getElementById('result-preview');
const compareOverlay = document.getElementById('compare-overlay');
const compareHandle = document.getElementById('compare-handle');
const compareSlider = document.getElementById('compare-slider');
const loadingOverlay = document.getElementById('loading-overlay');

// State
let currentFile = null;
let currentResultBlob = null;

// Setup UI
setupLoadingUI();

// Event Listeners
if (browseBtn) {
    browseBtn.addEventListener('click', () => fileInput.click());
}

if (fileInput) {
    fileInput.addEventListener('change', handleFileSelect);
}

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    if (e.dataTransfer.files.length) {
        handleFile(e.dataTransfer.files[0]);
    }
});

downloadBtn.addEventListener('click', downloadResult);

// Slider Logic
compareSlider.addEventListener('input', updateSliderPosition);

function updateSliderPosition() {
    const value = compareSlider.value;
    compareOverlay.style.width = `${value}%`;
    compareHandle.style.left = `${value}%`;
}

// Sync dimensions to ensure pixel-perfect overlay
window.addEventListener('resize', syncOverlayDimensions);
// Ensure sync happens when images load, even if outside normal flow
originalPreview.addEventListener('load', syncOverlayDimensions);
resultPreview.addEventListener('load', syncOverlayDimensions);

function syncOverlayDimensions() {
    if (!resultPreview.offsetWidth) return;

    // The result image (base) dictates the dimensions.
    // We must force the overlay image (original) to match these exact dimensions
    // so it aligns perfectly despite being inside a clipped container.
    const width = resultPreview.offsetWidth;
    const height = resultPreview.offsetHeight;

    originalPreview.style.width = `${width}px`;
    originalPreview.style.height = `${height}px`;
}

function setupLoadingUI() {
    // loadingOverlay.innerHTML = ''; // Don't clear innerHTML as we might lose styles/structure if defined in HTML. 
    // Actually, let's keep it defined in HTML to ensure flex structure is correct.
}

function handleFileSelect(e) {
    if (e.target.files.length) {
        handleFile(e.target.files[0]);
    }
}

function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        return;
    }

    currentFile = file;
    if (filenameSpan) {
        filenameSpan.textContent = file.name;
        filenameSpan.classList.remove('hidden');
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        // Set BOTH to original initially so container has size and we see "Before/Before"
        originalPreview.src = e.target.result;
        resultPreview.src = e.target.result;

        // UI Updates
        previewPlaceholder.classList.add('hidden');
        compareContainer.classList.remove('hidden');
        previewControls.classList.add('hidden'); // Hid controls initially

        // Hide Slider Controls during processing
        compareHandle.classList.add('hidden');
        compareSlider.classList.add('hidden');

        // Reset Slider
        compareSlider.value = 50;
        updateSliderPosition();

        // Process
        processImage(file);

        // Sync dimensions once original image loads
        originalPreview.onload = syncOverlayDimensions;
    };
    reader.readAsDataURL(file);
}

async function processImage(file) {
    showLoading(true);

    try {
        const { removeBackground } = await import("@imgly/background-removal");
        const imglyRemoveBackground = removeBackground;

        const blob = await imglyRemoveBackground(file, {
            progress: (key, current, total) => {
                // Optional: Update detailed progress if needed
            }
        });

        currentResultBlob = blob;
        const url = URL.createObjectURL(blob);
        resultPreview.src = url;

        // Ensure dimensions match when result loads
        resultPreview.onload = syncOverlayDimensions;

        // Show controls and slider only after success
        previewControls.classList.remove('hidden');
        compareHandle.classList.remove('hidden');
        compareSlider.classList.remove('hidden');

    } catch (error) {
        console.error("BG Removal failed:", error);
        alert("Failed to remove background. Please try a different image.");
    } finally {
        showLoading(false);
    }
}

function downloadResult() {
    if (!currentResultBlob) return;

    const url = URL.createObjectURL(currentResultBlob);
    const link = document.createElement('a');
    const baseName = currentFile ? currentFile.name.split('.')[0] : 'image';
    link.download = `${baseName}_nobg.png`;
    link.href = url;
    link.click();

    setTimeout(() => URL.revokeObjectURL(url), 100);
}

function showLoading(show) {
    if (show) {
        loadingOverlay.classList.remove('hidden');
    } else {
        loadingOverlay.classList.add('hidden');
    }
}
