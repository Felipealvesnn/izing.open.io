# Etapa base para instalar dependências globais
FROM node:18-bookworm-slim as global-deps-stage

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências para o contêiner
COPY package*.json ./

# Definir variáveis de ambiente
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV NODE_ENV=dev
ENV CHROME_BIN=google-chrome-stable

# Instalar dependências globais, se necessário
RUN npm install pm2@latest -g

# Etapa de desenvolvimento
FROM global-deps-stage as develop-stage

# Definir diretório de trabalho
WORKDIR /app

# Copiar novamente package*.json para garantir que estão disponíveis para npm install
COPY package*.json ./

# Instalar dependências de desenvolvimento
RUN npm install

# Etapa de construção
FROM develop-stage as build-stage

# Definir diretório de trabalho
WORKDIR /app

# Copiar todo o código-fonte para o contêiner
COPY . .

# Construir a aplicação
RUN npm run build

# Etapa de desenvolvimento de servidor
FROM build-stage as development-stage

# Definir variáveis de ambiente
ENV NODE_ENV=development

# Definir ponto de entrada para o desenvolvimento
ENTRYPOINT ["npm", "run", "dev:server"]

# Etapa de produção
FROM build-stage as production-stage

# Definir variáveis de ambiente
ENV NODE_ENV=production

# Copiar script de entrada para o contêiner
COPY docker-entrypoint.sh .

# Garantir permissões de execução para o script de entrada
RUN chmod +x docker-entrypoint.sh

# Definir ponto de entrada para a produção
ENTRYPOINT ["./docker-entrypoint.sh"]
