## Configuração do Docker Compose

### node-app:

container_name: Nome do container para o aplicativo Node.js.

build: Configuração para construir a imagem do Node.js usando o Dockerfile.

volumes: Mapeamento do código fonte da aplicação para dentro do container.

ports: Mapeamento da porta do host para o container do Node.js.

environment: Variável de ambiente para a URL de conexão com o banco de dados PostgreSQL.

depends_on: Garante que o serviço db (PostgreSQL) seja iniciado antes do node-app.

## database (postgres)

container_name: Nome do container para o PostgreSQL.

image: Imagem Docker oficial do PostgreSQL.

restart: Política de reinicialização do container.

environment: Configuração das variáveis de ambiente para o PostgreSQL (usuário, senha e nome do banco de dados).

ports: Mapeamento da porta do host para o container do PostgreSQL.

volumes: Volume para persistir os dados do PostgreSQL.

### volumes:

postgres-data: Volume Docker para persistir os dados do PostgreSQL.


## Configuração do Dockerfile

Usa a imagem oficial do Node.js

    FROM node:14

Cria e define o diretório de trabalho dentro do container

    WORKDIR /app

Copia os arquivos de dependências da aplicação

    COPY package*.json ./

Instala as dependências da aplicação

    RUN npm install

Copia o código fonte da aplicação para o diretório de trabalho

    COPY . .

Expõe a porta 3000 para o mundo exterior

    EXPOSE 3000

Comando para iniciar a aplicação

    CMD ["node", "server.js"]




# Executando a Aplicação
No terminal, navegue até o diretório onde está seu docker-compose.yml.

Execute docker-compose up --build para iniciar os serviços.

Sua aplicação Node.js estará acessível em http://localhost:3000.

### Considerações

Certifique-se de substituir mydatabase pelo nome real do seu banco de dados PostgreSQL.

Este exemplo usa versões específicas (latest para PostgreSQL e Node.js 14), você pode ajustar conforme necessário.

Adicione configurações adicionais, como volumes para persistência de dados do Node.js, dependendo dos requisitos da sua aplicação.

Com essas configurações, você deve ter uma aplicação Node.js conectada a um banco de dados PostgreSQL executando dentro de containers Docker usando Docker Compose. Isso facilita o desenvolvimento, teste e distribuição da sua aplicação de forma consistente e isolada.