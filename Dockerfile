FROM node:14-slim

# Create app directory
RUN mkdir -p /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/

WORKDIR /usr/src/app



RUN npm install
# RUN npm run data:import
# Bundle app source
COPY . /usr/src/app
EXPOSE 3000
# CMD ["node","seeder.js"]

CMD ["npm","start"]