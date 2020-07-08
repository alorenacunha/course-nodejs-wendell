copia do readme do curso

docker run `
    --name postgres `
    -e POSTGRES_USER=admin `
    -e POSTGRES_PASSWORD=senhaadmin `
    -e POSTGRES_DB=hero `
    -p 5432:5432 `
    -d `
    postgres

docker ps

docker exec -it postgres /bin/bash

    --link postgres:postgres `permissão 
    -d ` roda em segundo plano

docker run `
    --name adminer `
    -p 8080:8080 `
    --link postgres:postgres `
    -d `
    adminer

docker run `
    --name mongodb `
    -p 27017:27017 `
    -e MONGO_INITDB_ROOT_USERNAME=admin `
    -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin `
    -d `
    mongo:4

docker run `
    --name mongoclient `
    -p 3000:3000 `
    --link mongodb:mongodb `
    -d `
    mongoclient/mongoclient

docker exec -it mongodb `
    mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin `
    --eval "db.getSiblingDB('hero').createUser({user: 'dba', pwd: 'senhaadmin', roles: [{role: 'readWrite', db: 'hero'}]})"

--eval 