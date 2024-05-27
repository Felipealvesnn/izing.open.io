# Usando a imagem base do Node.js
FROM node:21

# Definindo o diretório de trabalho no contêiner
WORKDIR /app

# Copiando os arquivos de configuração do package.json e package-lock.json
COPY package*.json ./

# Instalando as dependências do projeto
RUN npm install

# Instalando o TypeScript globalmente
RUN npm install -g typescript

# Copiando todos os arquivos do projeto para o contêiner
COPY . .

# Compilando os arquivos TypeScript
RUN tsc

# Expondo a porta da aplicação
EXPOSE 3100

# Expondo a porta de depuração
EXPOSE 9229

# Comando para iniciar a aplicação
CMD ["npm", "start"]
