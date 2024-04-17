FROM node:18.14.0-alpine
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

RUN apk update && apk upgrade
RUN apk add git

COPY . /usr/src/nuxt-app/
RUN npm install

ENV NODE_ENV=production
RUN npm run build

EXPOSE 5000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=5000

CMD [ "npm", "start" ]
