FROM node:11
WORKDIR /app
COPY package.json /app
COPY . /app
ARG NODE_ENV=production
RUN npm install
RUN npm run build:prod
CMD npm run start:prod
EXPOSE 80
EXPOSE 443