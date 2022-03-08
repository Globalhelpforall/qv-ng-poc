# Stage 1
FROM node:14.19.0-slim as build-step
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2
FROM nginx:latest
COPY --from=build-step /app/dist/raven /usr/share/nginx/html
EXPOSE 80
