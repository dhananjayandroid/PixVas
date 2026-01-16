import Upscaler from 'upscaler'
import defaultModel from '@upscalerjs/default-model'

// DOM Elements
const uploadSection = document.getElementById('upload-section')
const dropZone = document.getElementById('drop-zone')
const fileInput = document.getElementById('file-input')
const browseBtn = document.getElementById('browse-btn')
const processingSection = document.getElementById('processing-section')
const resultSection = document.getElementById('result-section')
const originalPreview = document.getElementById('original-preview')
const resultPreview = document.getElementById('result-preview')
const progressBar = document.getElementById('progress-bar')
const progressText = document.getElementById('progress-text')
const downloadBtn = document.getElementById('download-btn')
const restartBtn = document.getElementById('restart-btn')
const originalDimensions = document.getElementById('original-dimensions')
const targetDimensions = document.getElementById('target-dimensions')

// Initialize Upscaler
const upscaler = new Upscaler({
    model: defaultModel,
})

// Event Listeners
browseBtn.addEventListener('click', () => fileInput.click())

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0]
    if (file) handleFile(file)
})

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault()
    dropZone.classList.add('border-primary', 'bg-primary/5')
})

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('border-primary', 'bg-primary/5')
})

dropZone.addEventListener('drop', (e) => {
    e.preventDefault()
    dropZone.classList.remove('border-primary', 'bg-primary/5')
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
})

restartBtn.addEventListener('click', resetUI)

downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'pixvas-upscaled.png';
    link.href = resultPreview.src;
    link.click();
})

// Functions
function handleFile(file) {
    if (!file.type.match('image.*')) {
        alert('Please upload an image file.')
        return
    }

    // Show processing state
    uploadSection.classList.add('hidden')
    processingSection.classList.remove('hidden')

    const reader = new FileReader()
    reader.onload = (e) => {
        const img = new Image()
        img.src = e.target.result
        img.onload = () => {
            originalDimensions.textContent = `${img.width} x ${img.height} px`
            // Start Upscaling
            processImage(img.src)
        }
    }
    reader.readAsDataURL(file)
}

async function processImage(imageSrc) {
    try {
        const startTime = performance.now()

        // Reset Progress
        updateProgress(0, 'Initializing Neural Network...')

        const upsaledImgSrc = await upscaler.upscale(imageSrc, {
            patchSize: 64,
            padding: 2,
            progress: (percent) => {
                updateProgress(percent * 100, 'Enhancing details...')
            }
        })

        // Show Result
        displayResult(imageSrc, upsaledImgSrc)

    } catch (err) {
        console.error(err)
        alert('Failed to process image. Please try again.')
        resetUI()
    }
}

function updateProgress(percent, text) {
    progressBar.style.width = `${percent}%`
    progressText.textContent = `${Math.round(percent)}%`
}

function displayResult(originalSrc, upscaledSrc) {
    processingSection.classList.add('hidden')
    resultSection.classList.remove('hidden')

    originalPreview.src = originalSrc
    resultPreview.src = upscaledSrc

    // Update dimensions
    const img = new Image()
    img.src = upscaledSrc
    img.onload = () => {
        targetDimensions.textContent = `${img.width} x ${img.height} px`
    }
}

function resetUI() {
    uploadSection.classList.remove('hidden')
    processingSection.classList.add('hidden')
    resultSection.classList.add('hidden')
    fileInput.value = ''
    progressBar.style.width = '0%'
    progressText.textContent = '0%'
    originalPreview.src = ''
    resultPreview.src = ''
}
