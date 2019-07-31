# base image
FROM node:10.15.3

# set working directory
WORKDIR /app
ADD . /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json ./package.json
RUN npm install --silent

EXPOSE 3004

# start app
CMD ["npm", "start"]
