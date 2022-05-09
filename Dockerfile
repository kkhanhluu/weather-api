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
FROM parent as test
ENV NODE_ENV=test

ARG SKIP_TESTS=false

COPY package.json yarn.lock tsconfig.json tsoa.json ./
COPY src/ ./src/
COPY --chown=node:node jest.config.js ./
COPY --chown=node:node test/ ./test/
COPY --chown=node:node mocks/ ./mocks/

RUN yarn
RUN if [ "${SKIP_TESTS}" != "true" ]; then npm run test; fi

CMD [ "yarn", "run", "test" ]

###
FROM parent as development
ENV NODE_ENV=development

COPY package.json yarn.lock tsconfig.json tsoa.json ./
COPY src/ ./src/

RUN yarn 

EXPOSE 4000

CMD [ "yarn", "run", "start" ]