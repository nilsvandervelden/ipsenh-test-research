FROM node:14.17-alpine3.11

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN chmod 777 /usr/src/app/entrypoint.sh

ENTRYPOINT ["sh", "/usr/src/app/entrypoint.sh"]