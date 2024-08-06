# Etapa base para instalar dependências
FROM node:18-bookworm-slim AS base

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências para o contêiner
COPY package*.json ./

# Instalar dependências de produção
RUN npm install

# Etapa de desenvolvimento
FROM base AS development

# Instalar dependências globais para desenvolvimento, se necessário
RUN npm install -g pm2

# Copiar todo o código-fonte para o contêiner
COPY . .

# Definir variáveis de ambiente para desenvolvimento
ENV NODE_ENV=development

# Expor a porta para desenvolvimento
EXPOSE 3100

# Comando para rodar em desenvolvimento
CMD ["npm", "run", "dev:server"]

# Etapa de produção
FROM base AS production

# Copiar todo o código-fonte para o contêiner
COPY . .

# Definir variáveis de ambiente para produção
ENV NODE_ENV=production

# Construir a aplicação para produção
RUN npm run build

# Expor a porta para produção
EXPOSE 3100

# Copiar script de entrada para o contêiner e garantir permissões
COPY docker-entrypoint.sh .
RUN chmod +x docker-entrypoint.sh

# Comando para rodar em produção
ENTRYPOINT ["./docker-entrypoint.sh"]
