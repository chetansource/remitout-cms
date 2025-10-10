# ---------- STAGE 1: BUILD ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# Build the Payload CMS TypeScript project
RUN npm run build

# ---------- STAGE 2: RUN ----------
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only package files first
COPY --from=builder /app/package*.json ./

# Copy everything that resulted from the build stage
COPY --from=builder /app ./

# Clean dev dependencies and reinstall only production ones
RUN npm install --omit=dev

# Use PORT from environment variable
ENV PORT=${PORT:-5000}

EXPOSE ${PORT}

CMD ["npm", "run", "start"]
