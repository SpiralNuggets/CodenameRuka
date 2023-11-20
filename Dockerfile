FROM node:alpine

# Set working directory
WORKDIR /app

# Copy all files to working directory
COPY . .

# Install dependencies
RUN npm install
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Run npm start
CMD ["npm", "start"]