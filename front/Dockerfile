from node:latest

WORKDIR /app

ENV VITE_URL=http://localhost:3200

COPY package.json .

COPY yarn.lock .

RUN yarn install

COPY ./ ./

RUN yarn build

RUN yarn global add serve

EXPOSE 3000

ENTRYPOINT [ "serve", "dist" ]
