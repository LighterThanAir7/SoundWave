FROM node:24-alpine

WORKDIR /app

# Kopiramo package.json i package-lock.json kako bismo instalirali dependencyje
COPY ../package*.json ./

# Instaliramo sve pakete unutar kontejnera
RUN npm install

# Kopiramo ostatak backend koda u kontejner
COPY . .

# Otvaramo port 4000 na kojem sluša Express server
EXPOSE 4000

# Pokrećemo Express server pomoću Node-a direktno
CMD ["node", "server.js"]