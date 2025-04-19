# Use Node.js v22 official image
FROM node:22

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy the rest of the app source code
COPY . .

# Expose port (adjust if needed)
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]
