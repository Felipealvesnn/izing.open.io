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
FROM node:18-slim AS base

WORKDIR /app

# Instalar dependências do sistema necessárias
# Instalar dependências do sistema necessárias
# RUN apt-get update && apt-get install -y \
#     ffmpeg \
#     libvips-dev \
#     build-essential \
#     python3 \
#     && rm -rf /var/lib/apt/lists/*

# Baixar o script wait-for-it.sh
RUN curl -o /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
    chmod +x /usr/local/bin/wait-for-it.sh

# Instalar o PM2 globalmente
RUN npm install pm2@latest -g

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências de desenvolvimento
RUN npm ci

# Copiar o código da aplicação
COPY . .

# Executar o build
RUN npm run build --verbose

# Remover dependências de desenvolvimento e manter apenas as de produção
# RUN npm prune --production

# Criar diretório para logs
RUN mkdir -p /app/logs

# Definir variável de ambiente
# ENV NODE_ENV=production

# Expor a porta que sua aplicação vai usar
EXPOSE 3100

# Comando para iniciar o servidor Node.js usando PM2
CMD ["pm2-runtime", "dist/server.js", "--output", "/app/logs/out.log", "--error", "/app/logs/error.log"]
