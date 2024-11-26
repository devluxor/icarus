FROM node:20-alpine as base

COPY package.json ./

RUN yarn install

COPY src ./src

# Copy tsconfig.json to base image too
COPY tsconfig.json ./tsconfig.json

RUN npm run build

FROM node:22.11.0-alpine

COPY --from=base ./node_modules ./node_modules
COPY --from=base ./package.json ./package.json
COPY --from=base /dist /dist

EXPOSE 8080
CMD ["npm", "run", "start"]