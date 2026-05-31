# Use Node 20 to match your GitHub Actions and local environment
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /authSystem

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

# Install only production dependencies (since it's a production container)
RUN npm ci --only=production

# Copy the rest of your application files
COPY . .

# Expose port 5000 (matching your app's port)
EXPOSE 5000

# Start the application
CMD ["npm", "start"]