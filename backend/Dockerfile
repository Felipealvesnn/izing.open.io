FROM node:18-bookworm-slim as global-deps-stage

WORKDIR /app

# Instalação de dependências globais
RUN apt-get update \
  && apt-get install -y wget gnupg nano ffmpeg=7:5.1.4-0+deb12u1 \
  && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/* && npm install pm2@latest -g

# Variáveis de ambiente
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV NODE_ENV=dev
ENV CHROME_BIN=google-chrome-stable

# Copia os arquivos package.json e package-lock.json para a instalação de dependências
COPY package*.json ./

# Instalação de dependências de desenvolvimento
RUN npm install

# Etapa de desenvolvimento
FROM global-deps-stage as develop-stage

# Copia os arquivos de configuração e código-fonte para o diretório de trabalho
COPY . .

# Etapa de construção
FROM develop-stage as build-stage

# Define o diretório de trabalho para o desenvolvimento
WORKDIR /app

# Copia os arquivos novamente para garantir que estão presentes na etapa de construção
COPY . .

# Etapa final
FROM build-stage as final-stage

# Copia o script de entrada para o contêiner
COPY docker-entrypoint.sh .
RUN chmod +x docker-entrypoint.sh

# Define o diretório de trabalho para a execução da aplicação
WORKDIR /app

# Define o ponto de entrada do contêiner
ENTRYPOINT ["./docker-entrypoint.sh"]
