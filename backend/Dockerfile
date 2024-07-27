# Use an official Node.js runtime as a parent image
FROM node:21

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 3100

# Define the command to run the application
CMD ["npm", "start"]
