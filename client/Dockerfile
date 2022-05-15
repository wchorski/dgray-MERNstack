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

CMD ["npm", "run", "start"] 
