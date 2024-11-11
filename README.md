# Descripción

##Correr en dev

1. Clonar repositorio
2. Crear ima copia de ```.env.template```, renombrarla a .env y cambiar los valores de las variables
3. Intalar dependencias con ```npm install```
4. Levantar la base de datos con ```docker-compose up -d```
5. Correr las migraciones de Prisma con ```npx prisma migrate dev```
6. Ejecutar seed ```npm run seed ```
6. Correr el proyecto con ```npm run dev```