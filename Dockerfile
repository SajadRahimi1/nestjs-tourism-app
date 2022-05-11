FROM nestjs
WORKDIR /tourism-app
COPY package.json /tourism-app
RUN npm install
COPY . /tourism-app
CMD [ "npm","run","start:dev" ]
EXPOSE 3000