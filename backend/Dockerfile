FROM node:18-bookworm-slim AS base

WORKDIR /app

COPY package*.json ./

RUN npm install --verbose

FROM base AS development

RUN npm install -g pm2

COPY . .

ENV NODE_ENV=development

EXPOSE 3100

CMD ["npm", "run", "dev:server"]

FROM base AS production

COPY . .

ENV NODE_ENV=production

RUN npm run build

EXPOSE 3100

COPY docker-entrypoint.sh .
RUN chmod +x docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]
