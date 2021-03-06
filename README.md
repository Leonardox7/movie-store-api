# movie-store-api

## Libs utilizadas
 - chai v4.2.0
 - mocha v8.0.1
 - nyc v15.1.0
 - istanbul v0.4.5
 - @fnando/cpf v1.0.1
 - dotenv v8.2.0
 - express v4.17.1
 - moment v2.27.0
 - mongoose v5.9.20

## Instalação

```bash
npm install
```
## Execução

```bash
npm start
```
## Testes

```bash
npm test
```

## Rotas
   #### Usuário
   - Permite Atualizar.
   - Realizar busca pelo cpf.
   - Buscar todos os usuários.
   - Excluir um usuário.
   - Atualizar usuário.

   #### Filme
   - Permite inserir filmes.
   - Buscar todos os filmes.
   - Verificar filmes dísponveis em estoque no momento.
   - Acrescentar quantidades de filmes no estoque.
   - Buscar filme por id.
  
#### Aluguel    
   - Permite alugar vários filmes de acordo com a regra.
   - Atualizar aluguel do(s) filme(s) pelo id do usuario
   - Buscar todos os alugados.
   - Buscar aluguel pelo id do usuário
   - Deletar usuário.

## Regras de negócio
   - Apenas usuários maiores de 18 anos pode realizar o registro.
   - Usuário pode ficar com o filme durante 5 dias.
   - É permitido aluguel de até 5 filmes por vez.
   - É permitido renovar apenas 2 vezes.

