FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Copy dependencies
COPY package.json ./

# Install dependencies
RUN npm install

# copy app
COPY ./src .

#open port of container
EXPOSE 8080

#start app
CMD [ "node", "app.js" ]