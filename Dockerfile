# Usa a imagem oficial do Node.js
FROM node:14

# Cria e define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências da aplicação
COPY package*.json ./

# Instala as dependências da aplicação
RUN npm install

# Copia o código fonte da aplicação para o diretório de trabalho
COPY . .

# Expõe a porta 3000 para o mundo exterior
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "src/index.js"]


