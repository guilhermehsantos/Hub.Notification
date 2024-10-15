FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run migration:generate -- -d src/infra/database/typeORM/data-source.ts || true

RUN npm run build

RUN npm run migration:run -- -d src/infra/database/typeORM/data-source.ts || true

EXPOSE 3002

CMD ["npm", "start"]
