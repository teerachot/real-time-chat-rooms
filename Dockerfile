FROM node:latest

RUN mkdir service

WORKDIR /service



COPY . .

ENV NODE_ENV=PRODUCTION

CMD [ "CMD" ]