FROM node:14

LABEL version="0.0.1"
LABEL description="React Frontend for dgray tut "

WORKDIR /app

COPY . ./
COPY ./package.json ./

RUN mkdir -p /app/node_modules
RUN chown node:node /app/node_modules

RUN if [ "$NODE_ENV" = "development" ]; \
  then npm install; \
  else npm install --only=production; \
  fi 


CMD ["npm", "run", "start"] 
