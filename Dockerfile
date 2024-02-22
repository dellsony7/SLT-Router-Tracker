# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /index

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .


#BUID
RUN npm run build

# Expose the port that your app will run on
EXPOSE 8082

# Define the command to run your application
CMD [ "npm", "start" ]