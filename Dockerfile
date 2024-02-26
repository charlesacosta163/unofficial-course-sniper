FROM node-alpine AS builder

WORKDIR /app
COPY package-lock.json package.json ./
RUN npm install

COPY . ./
ENTRYPOINT ["node"]
CMD ["src/Server/server.js", "src/Server/auth.js"]


