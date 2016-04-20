# token-based-auth-nodejs
Aplicação de exemplo de autenticação com token

`POST /api/auth` obtem um token de acesso

`POST /api/users` insere um usuário no banco de dados

`GET /api/users` lista os usuários do banco de dados

Para autenticação envie o token pela URL pelo parâmetro ou pelo cabeçalho com o nome `token`