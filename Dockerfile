FROM node:16 AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:16-alpine AS final
WORKDIR /app
COPY package.json ./
RUN yarn install --prod
COPY --from=build /app/dist ./dist
CMD yarn start:prod
