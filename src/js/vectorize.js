// DOM Elements
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const browseBtn = document.getElementById('browse-btn');
const uploadSection = document.getElementById('upload-section');
const workspaceSection = document.getElementById('workspace-section');
const originalPreview = document.getElementById('original-preview');
const svgContainer = document.getElementById('svg-container');
const loadingOverlay = document.getElementById('loading-overlay');
const sourceResSpan = document.getElementById('source-res');

// Tool Settings
const simplifyToggle = document.getElementById('simplify-toggle');
const precisionSlider = document.getElementById('precision-slider');
const precisionVal = document.getElementById('precision-val');
const updateBtn = document.getElementById('update-btn');

// Export Buttons
const dlSvgBtn = document.getElementById('dl-svg-btn');
const copyBtn = document.getElementById('copy-btn');
// Check if back button exists in DOM, it might not based on previous edits but we'll try to support it logic-wise if added back
const backBtn = document.getElementById('back-btn');

let currentFile = null;
let currentSvgString = '';
let worker = null;

// Initialize Worker
if (window.Worker) {
    worker = new Worker(new URL('./image-worker.js', import.meta.url), { type: 'module' });

    worker.onmessage = (e) => {
        const { status, svg, error } = e.data;
        if (status === 'complete') {
            currentSvgString = svg;
            renderSVG(svg);
        } else if (status === 'error') {
            console.error("Worker Error:", error);
            alert("Vectorization failed: " + error);
        }
        showLoading(false);
    };
} else {
    alert("Your browser does not support Web Workers. The app may not work correctly.");
}

// --- Event Listeners ---

// Upload Handling
dropZone.addEventListener('click', () => fileInput.click());
browseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.click();
});

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('border-primary', 'bg-blue-50/50');
});

dropZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropZone.classList.remove('border-primary', 'bg-blue-50/50');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('border-primary', 'bg-blue-50/50');
    if (e.dataTransfer.files.length) {
        handleFile(e.dataTransfer.files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length) {
        handleFile(e.target.files[0]);
    }
});

function handleFile(file) {
    if (!file.type.startsWith('image/')) return;
    currentFile = file;

    const reader = new FileReader();
    reader.onload = (e) => {
        const imgUrl = e.target.result;
        originalPreview.src = imgUrl;

        // Get Dimensions
        const img = new Image();
        img.onload = () => {
            if (sourceResSpan) sourceResSpan.textContent = `${img.width}x${img.height}px`;
        };
        img.src = imgUrl;

        // Show Workspace
        uploadSection.classList.add('hidden');
        workspaceSection.classList.remove('hidden');

        // Start Processing
        vectorizeImage(imgUrl);
    };
    reader.readAsDataURL(file);
}

// Back Button logic if present
if (backBtn) {
    backBtn.addEventListener('click', () => {
        workspaceSection.classList.add('hidden');
        uploadSection.classList.remove('hidden');
        fileInput.value = '';
        currentFile = null;
        originalPreview.src = '';
        currentSvgString = '';
        // Remove SVG but keep loading overlay ref
        const oldSvg = svgContainer.querySelector('svg');
        if (oldSvg) oldSvg.remove();
    });
}

// Settings UI
precisionSlider.addEventListener('input', (e) => {
    precisionVal.textContent = `${e.target.value}%`;
});


// Update Result
updateBtn.addEventListener('click', () => {
    if (!originalPreview.src) return;
    vectorizeImage(originalPreview.src);
});

function vectorizeImage(imgSrc) {
    if (!worker) return;
    showLoading(true);

    // Prepare Image Data for Worker
    const img = new Image();
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);

        // Map UI to Tracer Config
        const workerConfig = {
            precision: parseInt(precisionSlider.value),
            simplify: simplifyToggle.checked
        };

        // Post Message
        worker.postMessage({
            imageData: imageData.data.buffer,
            width: img.width,
            height: img.height,
            config: workerConfig
        }, [imageData.data.buffer]);

    };
    img.src = imgSrc;
}

function renderSVG(svgString) {
    // Keep loading overlay, just inject SVG before it
    const overlay = document.getElementById('loading-overlay');
    const oldSvg = svgContainer.querySelector('svg');
    if (oldSvg) oldSvg.remove();

    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, "image/svg+xml");
    const newSvg = doc.documentElement;

    // Check if viewBox exists, if not try to create it from width/height
    if (!newSvg.hasAttribute('viewBox')) {
        const w = newSvg.getAttribute('width');
        const h = newSvg.getAttribute('height');
        if (w && h) {
            newSvg.setAttribute('viewBox', `0 0 ${parseFloat(w)} ${parseFloat(h)}`);
        }
    }

    svgContainer.insertBefore(newSvg, overlay);

    // Ensure responsive containment
    newSvg.removeAttribute('width');
    newSvg.removeAttribute('height');
    newSvg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    // Style directly to confirm
    newSvg.style.width = '100%';
    newSvg.style.height = '100%';
    newSvg.style.maxWidth = '100%';
    newSvg.style.maxHeight = '100%';
    newSvg.style.objectFit = 'contain';
}

function showLoading(isLoading) {
    if (isLoading) {
        loadingOverlay.classList.remove('hidden');
    } else {
        loadingOverlay.classList.add('hidden');
    }
}

// Export Logic
if (dlSvgBtn) {
    dlSvgBtn.addEventListener('click', () => {
        if (!currentSvgString) return;
        const blob = new Blob([currentSvgString], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "vectorized.svg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        if (!currentSvgString) return;
        navigator.clipboard.writeText(currentSvgString).then(() => {
            const originalText = copyBtn.querySelector('.text-sm').textContent;
            copyBtn.querySelector('.text-sm').textContent = "Copied!";
            setTimeout(() => copyBtn.querySelector('.text-sm').textContent = originalText, 2000);
        });
    });
}
