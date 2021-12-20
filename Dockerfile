FROM node:17-alpine

ENV \
  CLIENT_ID= \
  DISCORD_TOKEN= \
  # Guild id is optional
  GUILD_ID= \
  _=

WORKDIR /app

COPY package*.json /app

RUN npm ci --only=production && npm cache clean --force

COPY . /app

VOLUME [ "/app/db" ]

CMD npm start
