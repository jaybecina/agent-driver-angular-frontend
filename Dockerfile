FROM node:18-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

RUN npm install -g @angular/cli

COPY . .

RUN npm run build --configuration=production

FROM nginx:latest

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/src/app/dist/screenzads-web-app/browser /usr/share/nginx/html

EXPOSE 5000