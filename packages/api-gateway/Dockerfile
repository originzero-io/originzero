FROM node:latest
WORKDIR /app
COPY . /app/
RUN npm install
ENV NODE_ENV=production
CMD npm run prod
EXPOSE 5000