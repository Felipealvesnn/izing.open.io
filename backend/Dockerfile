# Dockerfile
FROM node:21

#WORKDIR /app
WORKDIR /app/src

COPY package*.json ./

RUN npm install

COPY . .

# Expose application port
EXPOSE 3100

# Expose debugging port
EXPOSE 9229


CMD [ "npm", "start" ]
