FROM node:10-alpine

RUN mkdir -p /server
WORKDIR /server

COPY package.json /server
RUN npm install

COPY . /server

EXPOSE 5000

CMD ["node", "/server/server.js"]
