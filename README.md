# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Docker Setup

### Prerequisites
- Docker installed on your machine
- Docker Compose (optional, for development)

### Quick Start with Docker

Build and run the application using Docker:

```bash
# Build the Docker image
docker build -t restaunax-frontend .

# Run the container
docker run -d -p 80:80 restaunax-frontend
```

The application will be available at `http://localhost:80`

### Docker Configuration

Our Docker setup uses a multi-stage build process for optimal production deployment:

1. **Build Stage**:
   - Uses `node:18-alpine` for a lightweight build environment
   - Installs dependencies and builds the React application

2. **Production Stage**:
   - Uses `nginx:alpine` to serve the static files
   - Optimized for production use
   - Exposes port 80

### Development with Docker

For development purposes, you can use volume mounting:

```bash
docker run -d -p 80:80 -v $(pwd):/app restaunax-frontend
```

To use environment variables:

```bash
docker run -d -p 80:80 -e REACT_APP_API_URL=your_api_url restaunax-frontend
```

### Docker Commands Reference

```bash
# View running containers
docker ps

# View container logs
docker logs <container_id>

# Stop container
docker stop <container_id>

# Remove container
docker rm <container_id>

# Remove image
docker rmi restaunax-frontend
```

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
