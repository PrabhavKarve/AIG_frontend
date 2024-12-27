# Use the official Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the React application
RUN npm run build

# Install a static server to serve the build folder
RUN npm install -g serve

# Expose the port your app runs on
EXPOSE 3000

# Command to serve the React application
CMD ["serve", "-s", "build"]
