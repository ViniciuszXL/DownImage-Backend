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

### -- ROTA USER -- ###

`GET` - `/api/users` - Retorna em uma array, todos os usuários cadastrados no banco de dados;

![](/assets/GET_USERS_CALLBACK.png)

`GET` - `/api/users/:username` - Retorna em uma array o usuário pesquisado;

Exemplo de url: `/api/users/ViniciuszXL`

![](/assets/GET_USERS_CALLBACK.png)

`POST` - `/api/users` - Cadastra um novo usuário e retorna o usuário em uma array;

Body de exemplo:
```
    {
        "username": "ViniciuszXL",
        "name": "Marcus Mendonça",
        "password": "Vini123@",
        "email": "eu@marcus.com"
    }
```

CAMPOS NECESSÁRIOS: `username`, `name`, `password` e `email`;

![](/assets/POST_USERS.png)

`DEL / DELETE` - `/api/users/:username` - Deleta um usuário informando o nome de usuário;

Exemplo de url: `/api/users/ViniciuszXL`

![](/assets/DELETE_USERS.png)

`PUT` - `/api/users/:username` - Atualiza as informações de um usuário e retornará com as informações novas;

Body de exemplo:
```
    {
        "password": "Senha123@",
        "email": "eu_2@marcus.com"
    }
```

PARÂMETROS ACEITOS: `username`, `name`, `email` e `password`.

### -- ANTES -- ###

![](/assets/GET_USERS_CALLBACK.png)

### -- DEPOIS -- ###

![](/assets/PUT_USERS_CALLBACK.png)

`POST` - `/api/users/login/:username` - Rota para verificar se a senha informada na hora do login é a mesma cadastrada;

Body de exemplo:
```
    {
        "password": "1234@1"
    }
```

CAMPOS NECESSÁRIOS: `password`.

![](/assets/POST_LOGIN_USER_CALLBACK.png)

### -- ROTA SEARCH -- ###

`GET` - `/api/search/:tags` - Retorna em uma array, as imagens no qual o usuário pesquisou;

Queries aceitas:
```
    "pageNumber": INTEIRO - Página da requisição
    "pageSize": INTEIRO - Quantidade de itens que serão mostrados por página
```

Exemplo de requisição: `/api/search/Naruto Shippudden` (Não é necessário converter os espaços para %20, ou vice-versa)

![](/assets/GET_SEARCH_CALLBACK.png)