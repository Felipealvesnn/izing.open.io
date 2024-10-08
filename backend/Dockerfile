# # Base stage with global dependencies
# FROM node:18-bookworm-slim AS base

# WORKDIR /app

# # Install global system dependencies
# RUN apt-get update \
#     && apt-get install -y wget gnupg nano ffmpeg libvips-dev build-essential python3 \
#     && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
#     && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list \
#     && apt-get update \
#     && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
#     --no-install-recommends \
#     && rm -rf /var/lib/apt/lists/*

# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
# ENV CHROME_BIN=google-chrome-stable

# # Dependencies stage
# FROM base AS deps

# COPY package*.json ./

# # Install Node.js dependencies
# RUN npm ci

# # Build stage
# FROM deps AS build

# COPY . .

# RUN npm run build

# # Production stage
# FROM base AS production

# WORKDIR /app

# # Copy built application
# COPY --from=build /app/dist ./dist
# COPY package*.json ./

# # Install production dependencies
# RUN npm ci --only=production --verbose

# # Install PM2 globally
# RUN npm install pm2@latest -g

# ENV NODE_ENV=production

# # Start the application using PM2
# CMD ["pm2-docker", "start", "./dist/server.js"]

# Base image com Node.js
# Base image com Node.js

FROM node:18-bookworm-slim as global-deps-stage

WORKDIR /app

RUN apt-get update \
  && apt-get install -y wget gnupg nano ffmpeg=7:5.1.4-0+deb12u1 \
  && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/* && npm install pm2@latest -g

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV NODE_ENV=dev
ENV CHROME_BIN=google-chrome-stable

FROM global-deps-stage as develop-stage
COPY package*.json ./
RUN npm install

FROM develop-stage as build-stage
COPY . .
RUN npm run build

FROM build-stage as development-stage
ENV NODE_ENV=development
ENTRYPOINT ["npm", "run", "dev:server"]

FROM build-stage as production-stage
ENV NODE_ENV=production
COPY docker-entrypoint.sh .
RUN chmod +x docker-entrypoint.sh
ENTRYPOINT ["./docker-entrypoint.sh"]

