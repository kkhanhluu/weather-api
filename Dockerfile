###
FROM node:16-alpine as parent

###
FROM parent as build

WORKDIR /usr/src/app

COPY package.json yarn.lock tsconfig.json ./
COPY src/ ./src/

RUN npm install 
RUN npm run build

###
FROM parent as base

WORKDIR /home/node/app

COPY --from=build --chown=node:node /usr/src/app/ ./

EXPOSE 4000

###
FROM base as test
ENV NODE_ENV=test

COPY --chown=node:node jest.config.ts ./
COPY --chown=node:node test/ ./test/

CMD [ "npm", "run", "test" ]

###
FROM base as development
ENV NODE_ENV=development

EXPOSE 4400

CMD [ "npm", "run", "start:dev" ]

###
FROM parent
ENV NODE_ENV=production

WORKDIR /home/node/app

COPY --from=build --chown=node:node /usr/src/app/dist/ ./dist/
COPY --from=build --chown=node:node /usr/src/app/node_modules/ ./node_modules/

CMD [ "node", "./dist/index.js" ]
