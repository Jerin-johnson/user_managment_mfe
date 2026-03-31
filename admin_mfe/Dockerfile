# -------- Build stage --------
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# -------- Production stage --------
FROM nginx:alpine

# Copy to /admin folder
COPY --from=builder /app/dist /usr/share/nginx/html/admin

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]