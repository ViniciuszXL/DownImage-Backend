# DownImage-Backend
Backend para a aplicação de download de imagens feito para a disciplina de projeto integrado.

## Dependências e frameworks utilizadas ##

* NodeJS
* Axios
* Cors
* Crypto
* Express
* Mongoose

## Como funciona? ##

Este é um projeto backend de uma aplicação que faz download de imagens na internet por parâmetros informados na hora da requisição.

Sua função é exclusivamente para isso, tendo em vista utilizando-se uma API pública e grátis, para que seja possível buscar em um banco de dados enorme, essas tais imagens correspondentes. 

## Mudança de valores ##

Alguns valores do projeto são facilmente mudados em `common > environment.js`. 

## Como instalar ##

Primeiramente, você precisa instalar as dependências do projeto. Abra um cmd dentro da pasta clonada, e insira `npm install`, que instalará todas as dependências.

Segundo, é necessário ter o `MongoDB` instalado em sua máquina para que ele funcione. Sem ele instalado, ele não funcionará.

Após ter feito os dois primeiros passos, abra um cmd na pasta clonada, digite `nodemon main.js` (Caso você tenha o nodemon instalado) ou `node main.js`.

O servidor irá escutar a porta `3030` por padrão, e uma mensagem como `Sucessfully starting the server!!` deverá aparecer após iniciá-lo.

## Rotas ##

### User ###

`GET` - `/api/users`: Retorna todos os usuários cadastrados no banco de dados
![](/assets/GET_USERS_CALLBACK.png)