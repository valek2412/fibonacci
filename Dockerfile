FROM node:16 AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16-alpine AS final
WORKDIR /app
COPY package.json ./
RUN npm install --only=production
COPY --from=build /app/dist ./dist
CMD npm run start:prod
