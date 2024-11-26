# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .
RUN chmod +x docker-entrypoint.js

# Generate prisma client
RUN npm run schema.generate

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Set entrypoint
ENTRYPOINT ["./docker-entrypoint.js"]

# Define the command to run the application
CMD ["npm", "run", "start:dev"]
