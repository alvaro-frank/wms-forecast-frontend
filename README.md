![CI Status](https://github.com/alvaro-frank/wms-forecast-frontend/actions/workflows/ci.yml/badge.svg)
![React](https://img.shields.io/badge/React-19.2%2B-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2.x-22B573?logo=react&logoColor=white)

A modern, interactive frontend dashboard for the WMS Demand Forecasting service. This application allows users to select specific tech brands and product categories to predict future inventory demand. It communicates with an XGBoost-powered backend engine and visualizes the 30-day historical trend alongside the predicted future value using **Recharts**.

## 📂 Project Structure
```text
├── public/                     # Static assets (Favicon, icons)
├── src/
│   ├── components/             # Reusable UI components
│   │   └── ForecastForm.tsx    # Form with dynamic dependent dropdowns for Brands and Categories
│   ├── data/                   # Static mappings and dictionaries
│   │   └── products.ts         # Real-world brand mappings and category generator logic
│   ├── hooks/                  # Custom React hooks
│   │   └── useForecast.ts      # Manages state, loading flags, and API side-effects
│   ├── services/               # External API integrations
│   │   └── api.ts              # Fetch requests to the FastAPI backend
│   ├── types/                  # TypeScript interfaces and DTOs
│   │   └── index.ts            # Type definitions for API Requests and Responses
│   ├── App.tsx                 # Main application layout, state orchestration, and Chart rendering
│   ├── main.tsx                # React application entry point
│   └── App.css                 # Global CSS and Custom Dark Theme variables
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite configuration
```

## 🛠️ Setup & Requirements

- `Node.js 18+`
- `npm`

1. **Clone the repository**
```bash
git clone https://github.com/alvaro-frank/wms-forecast-frontend.git
cd wms-forecast-frontend
```

2. **Install dependencies**
```bash
npm install
```

## ⚡ Quick Start

To run the application locally in development mode:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

_Note: For the application to work end-to-end, ensure the WMS Forecast Backend is running locally on `http://localhost:8000` with CORS configured to accept requests._

## 🏃 Usage & Features

The interface is divided into two main panels:

1. **Forecast Parameters**

- **Dynamic Selection**: Choose from real-world tech brands (e.g., Apple, NVIDIA, Meta). The Product Category dropdown intelligently filters its options based on the selected brand.
- **Data Validation**: The Target Forecast Date selector is constrained (e.g., max year 2024) to ensure predictions are only requested for periods the model understands.
- **UX States**: Includes comprehensive loading, empty, and error states for a smooth user experience.

2. **Demand Trend & Forecast**

- **Highlight Value**: Immediately displays the calculated predicted quantity.
- **Visual Context**: Utilizes `Recharts` to draw a responsive line chart. It plots the exact historical movement over the last 30 days and highlights the future predicted point in a distinct accent color, allowing users to instantly gauge if the forecast aligns with recent trends.

## 🧠 Methodology & Architecture

**Declarative Data Visualization**

The trend graph is rendered using `Recharts`, a composable charting library built on React components. This allows the chart and its custom tooltips/legends to be driven purely by the React component state, maintaining a clean and declarative codebase.

**State Management & API**

The component state and backend synchronization are abstracted into the `useForecast.ts` custom hook. This ensures the main UI (`App.tsx`) remains focused on layout and presentation. The data types are strictly typed with TypeScript interfaces to map perfectly 1:1 with the backend's Python Dataclasses and Pydantic schemas.

**Code Quality**

The repository is maintained with strict TypeScript rules and ESLint standard configurations to ensure clean, error-free code.

```bash
# Run the linter
npm run lint

# Build for production
npm run build
```

## ⚙️ CI/CD Pipeline

The project includes a GitHub Actions workflow (`ci.yml`) that automates the quality gate for the frontend application. On every push or pull request to the main branches, the pipeline executes the following checks:

- **Dependency Installation**: Fast and deterministic installs using `npm ci`.
- **Linting**: Runs ESLint to ensure code quality and consistent styling.
- **Build Verification**: Executes Vite's build process and TypeScript's type-checking to guarantee the application compiles successfully without errors before any code is merged.

## 🐳 Docker Support

The frontend application is optimized for containerized deployment using a multi-stage build process:

- **Build**: Uses a lightweight `node:18-alpine` image to install dependencies and compile the Vite/React application.
- **Production**: Uses `nginx:alpine` to serve the static compiled assets (`/dist`), resulting in a tiny, highly performant final image.
- **SPA Routing**: The Nginx server is pre-configured to fallback to `index.html`, ensuring seamless support for React client-side routing.

To build and run the Docker container locally:

```bash
# Build the Docker image
docker build -t wms-forecast-frontend .

# Run the container (mapping port 8080 on your host to port 80 in the container)
docker run -p 8080:80 wms-forecast-frontend
```

The application will then be accessible in your browser at `http://localhost:8080`.
