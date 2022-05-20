# specify the node base image with your desired version node:<version>
FROM nestjs
WORKDIR /app
# COPY package.json /app
# RUN npm install -v
COPY . /app
# CMD nest start --watch
EXPOSE 3000