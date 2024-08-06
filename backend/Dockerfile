# Etapa base para instalar dependências globais
FROM node:18-bookworm-slim as global-deps-stage

WORKDIR /app

# Copiar package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instalar dependências necessárias e configurar repositório do Google Chrome
#RUN apt-get update && apt-get install -y wget gnupg nano ffmpeg=7:5.1.4-0+deb12u1 \
  #&& wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  #&& echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list \
  #&& apt-get update && apt-get install -y google-chrome-stable \
  #fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
 # --no-install-recommends \
 # && rm -rf /var/lib/apt/lists/* \
 # && npm install pm2@latest -g

# Definir variáveis de ambiente
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV NODE_ENV=dev
ENV CHROME_BIN=google-chrome-stable

# Etapa de desenvolvimento
FROM global-deps-stage as develop-stage
WORKDIR /app

# Copiar novamente package*.json para garantir que estão disponíveis para npm install
COPY package*.json ./

# Instalar dependências de desenvolvimento
RUN npm install

# Etapa de construção
FROM develop-stage as build-stage

# Copiar todo o código-fonte para o contêiner
COPY . .

# Construir a aplicação
RUN npm run build

# Etapa de desenvolvimento de servidor
FROM build-stage as development-stage
ENV NODE_ENV=development

# Definir ponto de entrada para o desenvolvimento
ENTRYPOINT ["npm", "run", "dev:server"]

# Etapa de produção
FROM build-stage as production-stage
ENV NODE_ENV=production

# Copiar script de entrada para o contêiner
COPY docker-entrypoint.sh .
RUN chmod +x docker-entrypoint.sh

# Definir ponto de entrada para a produção
ENTRYPOINT ["./docker-entrypoint.sh"]
