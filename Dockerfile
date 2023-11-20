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

ENV NODE_ENV production

ENV NEXT_TELEMETRY_DISABLED 1

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Run npm start
CMD ["npm", "start"]