# Utiliser l'image officielle de Microsoft SQL Server
FROM mcr.microsoft.com/mssql/server:latest

# Définir les variables d'environnement pour SQL Server
ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=Root@1234  
ENV MSSQL_PID=Express
ENV MSSQL_DATABASE=projet

# Exposer le port de SQL Server
EXPOSE 1433

# Lancer SQL Server
CMD ["/opt/mssql/bin/sqlservr"]