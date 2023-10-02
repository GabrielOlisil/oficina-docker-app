from node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY main.js .

EXPOSE 3200

ENTRYPOINT [ "node", "main.js" ]