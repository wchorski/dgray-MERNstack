FROM node:14

WORKDIR /app
COPY package*.json ./

RUN mkdir -p /app/node_modules
RUN chown node:node /app/node_modules

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
  then npm install; \
  else npm install --only=production; \
  fi 


COPY . ./

EXPOSE $PORT

CMD ["npm", "run", "devdoc"]