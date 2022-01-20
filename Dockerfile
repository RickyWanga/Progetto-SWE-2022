FROM node:14-alpine
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm ci
RUN npm run build
EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
CMD [ "npm", "start" ]
