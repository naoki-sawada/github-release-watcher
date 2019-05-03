FROM node:10-alpine
ADD ./ /app
WORKDIR /app
RUN yarn install && yarn build
ENTRYPOINT ["yarn", "start"]
