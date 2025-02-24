# Use the official Node 19 image
FROM node:19-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of your app's source code
COPY . .

# Build your app (adjust if needed)
RUN npm run build

# Start your app
CMD ["npm", "run", "start"]