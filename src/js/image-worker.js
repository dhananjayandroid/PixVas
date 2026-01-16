import * as VTracer from 'wasm_vtracer';

// Initialize the WASM module
// Note: In a worker with Vite, top-level await might behave differently depending on browser support,
// but vite-plugin-top-level-await handles this transformation.
// We'll perform the vectorization when a message is received.

self.onmessage = async (e) => {
    const { imageData, width, height, config: configParams } = e.data;

    try {
        // Create config inside the worker
        const config = new VTracer.TracerConfig();

        // Apply presets or params
        // Default to Photo preset base
        config.presetPhoto();

        // Debug: Log params to ensure they are changing
        console.log("Worker received config:", configParams);

        // 1. Simplify Paths -> FilterSpeckle
        // If simplify is ON, remove larger specs (aggressive cleaning). If OFF, keep details (default).
        if (configParams.simplify) {
            config.setFilterSpeckle(64); // Much cleaner/smoother
        } else {
            config.setFilterSpeckle(4); // Default/Detail
        }

        // 2. Path Precision -> SpliceThreshold
        // Precision 100% = Lower Threshold (More accurate, more segments)
        // Precision 0% = Higher Threshold (Less accurate, fewer segments)
        // Mapping: 0-100 -> 90-10 (Wider range for visibility)
        // 100 -> 10 deg (High precision)
        // 0 -> 90 deg (Low precision)
        const threshold = 90 - ((configParams.precision || 85) * (80 / 100));
        config.setSpliceThreshold(threshold);

        // Run vectorization
        const rawData = new Uint8Array(imageData);
        const svgString = VTracer.convertImageToSvg(
            rawData,
            width,
            height,
            config
        );

        // Cleanup
        config.free();

        // Send back result
        self.postMessage({
            status: 'complete',
            svg: svgString
        });

    } catch (error) {
        self.postMessage({
            status: 'error',
            error: error.message
        });
    }
};
