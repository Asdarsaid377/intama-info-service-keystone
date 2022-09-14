ARG NODE_VERSION=16.17.0

FROM node:${NODE_VERSION}-alpine AS build

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

CMD ["yarn", "run-prod"]