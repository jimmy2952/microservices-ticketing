FROM node:alpine

WORKDIR /app
COPY package.json .
# not install developent package 
RUN npm install --only=prod
COPY . .

CMD ["npm", "start"]