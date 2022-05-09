###
FROM node:16 as parent

###
FROM parent as build

WORKDIR /usr/src/app

COPY package.json yarn.lock tsconfig.json tsoa.json ./
COPY src/ ./src/

RUN yarn 
RUN yarn run build

###
FROM parent as base

WORKDIR /home/node/app

COPY --from=build --chown=node:node /usr/src/app/ ./

EXPOSE 4000

###
FROM base as test
ENV NODE_ENV=test

COPY --chown=node:node jest.config.js ./
COPY --chown=node:node test/ ./test/
COPY --chown=node:node mocks/ ./mocks/

RUN yarn run test

CMD [ "yarn", "run", "test" ]

###
FROM base as development
ENV NODE_ENV=development

EXPOSE 4400

CMD [ "yarn", "run", "start:dev" ]

###
FROM parent
ENV NODE_ENV=production

WORKDIR /home/node/app

COPY --from=build --chown=node:node /usr/src/app/dist/ ./dist/
COPY --from=build --chown=node:node /usr/src/app/node_modules/ ./node_modules/

CMD [ "node", "./dist/index.js" ]
