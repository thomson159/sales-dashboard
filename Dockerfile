FROM node:22.21.1-alpine AS development-dependencies-env
WORKDIR /app
COPY package*.json ./
RUN npm ci --force
COPY . .

FROM node:22.21.1-alpine AS production-dependencies-env
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev --force

FROM node:22.21.1-alpine AS build-env
WORKDIR /app
COPY . .
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
RUN npm run build

FROM node:22.21.1-alpine
WORKDIR /app
COPY package*.json ./
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
CMD ["npm", "run", "start"]
