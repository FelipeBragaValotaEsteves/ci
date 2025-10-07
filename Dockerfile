FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache postgresql-client

COPY package*.json ./
RUN npm install --production
COPY . .

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]
