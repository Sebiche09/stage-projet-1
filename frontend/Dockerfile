# Utiliser une image de base
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY . .

# Exposer le port utilisé par Vite
EXPOSE 3000

# Lancer l'application
CMD ["npm", "run", "dev"]
