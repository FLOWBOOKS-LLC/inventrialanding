FROM node:20-alpine AS builder

WORKDIR /app

ENV NODE_ENV=production

# Install dependencies
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Copy source and build
COPY . .
RUN npm run build

### Production image
FROM nginx:stable-alpine

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Serve pre-rendered per-route HTML, SPA fallback, caching and crawl rules
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
