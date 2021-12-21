FROM node:17-alpine

LABEL \
  org.opencontainers.image.title="Discord Actions Bot" \
  org.opencontainers.image.description="🤖 A Discord Bot that helps with Action Items." \
  org.opencontainers.image.url="https://github.com/wei/discord-actions-bot" \
  org.opencontainers.image.documentation="https://github.com/wei/discord-actions-bot#readme" \
  org.opencontainers.image.source="https://github.com/wei/discord-actions-bot" \
  org.opencontainers.image.licenses="MIT" \
  org.opencontainers.image.authors="Wei He <docker@weispot.com> and Damir Temir <damir@temir.dev>" \
  maintainer="Wei He <docker@weispot.com>"

ENV \
  CLIENT_ID= \
  DISCORD_TOKEN= \
  # Optional #
  GUILD_ID= \
  TENOR_API_KEY= \
  _=

WORKDIR /app

COPY package*.json /app

RUN npm ci --only=production && npm cache clean --force

COPY . /app

VOLUME [ "/app/db" ]

CMD npm start
