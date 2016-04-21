# Token based auth with Nodejs
Aplicação de exemplo de autenticação com token

`POST /api/auth` obtem um token de acesso

**Retorno em caso de sucesso**
```
HTTP/1.x 200 OK
...
{
  status: 'OK',
  token: 'ACESS_TOKEN'
}
```

**Retorno em caso de erro**
```
HTTP/1.x 403 Forbidden
...
{
  status: 'ERROR',
  message: 'Error message'
}
```

`GET /api/users` lista os usuários do banco de dados

**Retorno**
```
HTTP/1.x 200 OK
...
[
  {
    _id: 8f7ds6f4dfds56f87ds8f0,
    name: "Edvaldo Szymonek",
    email: "edvaldoszy@gmail.com"
  }
]
```

`POST /api/users` insere um usuário no banco de dados

Para autenticação envie o token pela URL pelo parâmetro ou pelo cabeçalho com o nome `token`
