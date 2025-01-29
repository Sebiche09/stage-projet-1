FROM mcr.microsoft.com/dotnet/sdk:8.0
WORKDIR /app

# Copier le fichier projet et restaurer les dépendances
COPY *.csproj ./
RUN dotnet restore

# Copier le reste des fichiers et exécuter l'application
COPY . .
EXPOSE 5000
ENTRYPOINT ["dotnet", "run", "--no-launch-profile", "--urls", "http://0.0.0.0:5000"]
