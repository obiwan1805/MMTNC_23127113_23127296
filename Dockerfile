# to run tests
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json .
COPY eslint.config.js .
RUN npm install
COPY public ./public
COPY test ./test

# for production
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/public /usr/share/nginx/html
EXPOSE 3636
CMD ["nginx", "-g", "daemon off;"]