FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port 3000 for development server
EXPOSE 3000

# Start development server with hot-reloading
CMD ["npm", "start"]
