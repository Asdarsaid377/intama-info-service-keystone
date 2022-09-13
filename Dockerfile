# https://docs.docker.com/samples/library/node/
ARG NODE_VERSION=16.17.0

# Build container
FROM node:${NODE_VERSION}-alpine AS build
ARG DUMB_INIT_VERSION

WORKDIR /home/node

ADD ./package.json ./package.json
ADD ./yarn.lock ./yarn.lock

COPY . .

RUN yarn install 

ADD . /home/node

RUN yarn build && yarn cache clean

# Runtime container
FROM node:${NODE_VERSION}-alpine

WORKDIR /home/node

COPY --from=build /home/node /home/node

CMD ["yarn", "start"]