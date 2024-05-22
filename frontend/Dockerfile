# Etapa 1: Build da aplicação Quasar
FROM node:16 as build-stage

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código fonte para o diretório de trabalho
COPY . .

# Compila a aplicação Quasar
RUN npx quasar build

# Etapa 2: Servindo a aplicação usando Nginx
FROM nginx:alpine

# Copia os arquivos compilados da etapa de build para o diretório padrão do Nginx
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html

# Exponha a porta 80 para acessar a aplicação
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
