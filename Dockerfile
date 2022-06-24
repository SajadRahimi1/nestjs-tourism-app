# specify the node base image with your desired version node:<version>
FROM nestjs

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

CMD npm run start:dev

EXPOSE 3000