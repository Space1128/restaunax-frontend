# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Docker Development Setup

### Prerequisites
- Docker installed on your machine
- Docker Compose (recommended for development)

### Quick Start with Docker Compose (Recommended)

We provide a `docker-compose.yml` for the easiest development experience:

```bash
# Start the development environment
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the development environment
docker-compose down
```

The application will be available at `http://localhost:3000` with hot-reloading enabled.

### Alternative: Docker Without Compose

If you prefer not to use Docker Compose, you can still use Docker directly:

```bash
# Build the development Docker image
docker build -t restaunax-frontend-dev .

# Run the container in development mode
docker run -d \
  -p 3000:3000 \
  -v ${PWD}:/app \
  -v /app/node_modules \
  -e CHOKIDAR_USEPOLLING=true \
  --name restaunax-dev \
  restaunax-frontend-dev
```

### Development Features
- Hot-reloading enabled: Changes to your code will automatically refresh the browser
- Source code is mounted as a volume: Edit code on your host machine
- Node modules are preserved in a Docker volume
- Development server with all Create React App features
- Interactive terminal support for debugging

### Environment Variables
You can add environment variables by:

1. Creating a `.env` file in the project root:
```env
REACT_APP_API_URL=your_api_url
```

2. Or adding them to docker-compose.yml:
```yaml
environment:
  - REACT_APP_API_URL=your_api_url
```

### Useful Docker Compose Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and start services
docker-compose up -d --build

# Run tests
docker-compose exec frontend npm test

# Access container shell
docker-compose exec frontend sh
```

### Troubleshooting
- If hot-reloading isn't working:
  - Ensure `CHOKIDAR_USEPOLLING=true` is set
  - Check if `WATCHPACK_POLLING=true` is set
  - Verify that volumes are mounted correctly
- If modules are missing:
  ```bash
  docker-compose down -v  # Remove volumes
  docker-compose up -d --build  # Rebuild with fresh volumes
  ```
- For Windows users:
  - Use PowerShell or Git Bash for proper path handling
  - Ensure line endings are set to LF in git config

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
