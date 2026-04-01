FROM node:20-bookworm

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json tsconfig.json 
COPY . .

RUN npm install
RUN npm run build

CMD ["npm", "start"]