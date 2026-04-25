# ── Stage 1: Build ──────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json package-lock.json* ./
RUN npm install --prefer-offline

# Copy source
COPY . .

# Generate static output → .output/public
RUN npm run generate

# ── Stage 2: Serve ──────────────────────────────────────────────────────────────
FROM nginx:stable-alpine AS runner

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy generated static files
COPY --from=builder /app/.output/public /usr/share/nginx/html

# Custom nginx config for SPA-style routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
