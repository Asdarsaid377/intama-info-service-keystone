FROM  node:16.16.0-alpine3.16
WORKDIR /intama-service-keystone
COPY . .
RUN yarn install --silent
RUN yarn cache clean
CMD [ "yarn","run-prod"]