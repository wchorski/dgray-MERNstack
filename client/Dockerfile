FROM node:17 as build

LABEL version="0.0.1"
LABEL description="React Frontend for dgray tut "

WORKDIR /app
COPY . ./
COPY ./package.json ./

RUN npm install --only=production

RUN npm run build

FROM nginx:1.21.6-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf 
COPY ./default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]