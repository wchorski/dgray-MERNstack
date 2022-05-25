FROM node:16

LABEL version="0.0.1"
LABEL description="React Frontend for dgray tut "

WORKDIR /app

COPY . ./
COPY ./package.json ./

RUN if [ "$NODE_ENV" = "development" ]; \
  then npm install; \
  else npm install --only=production; \
  fi 

CMD if [ "$NODE_ENV" = "development" ]; \
  then ["npm", "run", "start"] \
  else ["npm", "run", "build"] \
  fi 

FROM nginx:1.21.6-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf 
COPY ./default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]