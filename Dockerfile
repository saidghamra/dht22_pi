FROM node:14.17
ENV NODE_ENV=production
WORKDIR /dht22_pi
COPY package*.json ./
RUN npm i --production
COPY . .
CMD ["npm", "run", "start"]