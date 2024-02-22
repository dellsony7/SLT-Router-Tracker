# Use an official Node.js runtime as a parent image
FROM node:18.18.2

# Set the working directory in the container
WORKDIR /usr/index

# Copy package.json and package-lock.json to the working directory
COPY package.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose the port that your app will run on
EXPOSE 8080

# Define the command to run your application
CMD [ "npm", "start" ]