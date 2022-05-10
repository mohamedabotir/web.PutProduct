FROM node as build


WORKDIR /app

COPY package.json /app

RUN npm  install --legacy-peer-deps

COPY . /app

RUN npm run build --prod

FROM nginx

COPY --from=build /app/dist/web.put-product /usr/share/nginx/html

