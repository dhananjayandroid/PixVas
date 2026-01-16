# PixVas

<div align="center">
  <img src="public/logo.png" alt="PixVas Logo" width="120" />
  <h1>PixVas</h1>
  <p><strong>Professional Image Processing. 100% Free. Private by Design.</strong></p>
  
  <p>
    <a href="https://twitter.com/AppRerum">
      <img src="https://img.shields.io/badge/Twitter-Follow%20Us-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Follow on Twitter" />
    </a>
    <a href="https://www.linkedin.com/company/apprerum/">
      <img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="Connect on LinkedIn" />
    </a>
  </p>
</div>

## 🚀 About The Project

PixVas is a suite of professional-grade image processing tools that run entirely in your browser using **Edge Computing** principles. We believe essential creative tools should be free and accessible to everyone.

**Why PixVas?**
*   **Privacy First**: No images are uploaded to servers. All processing happens locally on your device via WebAssembly and WebGL.
*   **Free Forever**: No subscriptions, no hidden fees, no login required.
*   **High Performance**: Leverages your hardware for instant results.

### 🛠️ Key Tools

| Tool | Description | Technology |
|:--- |:--- |:--- |
| **Vectorize Engine** | Convert raster images (JPG/PNG) to scalable SVG vectors. | `wasm_vtracer` |
| **BG Remover Pro** | Instantly remove backgrounds with high precision. | `@imgly/background-removal` |
| **AI Upscaler** | Enhance image resolution intelligently up to 4x. | `upscaler` / TensorFlow.js |

## 🏗️ Technology Stack

*   **Framework**: [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Processing**: WebAssembly (WASM), WebGL
*   **Language**: JavaScript (Modules)

---

## 🐳 Docker Deployment

The project is fully dockerized for easy deployment.

### Prerequisites

*   [Docker](https://docs.docker.com/get-docker/) installed on your machine.
*   [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop).

### Quick Start

1.  **Clone the repository** (if you haven't already):
    ```sh
    git clone https://github.com/yourusername/pixvas.git
    cd pixvas
    ```

2.  **Run with Docker Compose**:
    The included `docker-compose.yml` builds the app and serves it using Nginx.
    ```sh
    docker-compose up -d --build
    ```

3.  **Access the Application**:
    Open your browser and navigate to:
    [http://localhost:8080](http://localhost:8080)

### Stopping the Container

To stop the running application:
```sh
docker-compose down
```

---

## 💻 Local Development

If you prefer running without Docker for development:

1.  Install dependencies:
    ```sh
    npm install
    ```
2.  Start the development server:
    ```sh
    npm run dev
    ```

---

## 📞 Contact & Support

We love hearing from the community!

*   **Email**: [support@apprerum.com](mailto:support@apprerum.com)
*   **Twitter**: [@AppRerum](https://twitter.com/AppRerum)
*   **LinkedIn**: [AppRerum](https://www.linkedin.com/company/apprerum/)

<div align="center">
  <p>© 2026 PixVas. Built for the community.</p>
</div>
