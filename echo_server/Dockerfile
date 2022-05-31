FROM node:14
ENV PORT=3000

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production

COPY .. .
EXPOSE ${PORT}
CMD ["node", "index.js"]
