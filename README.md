# movie-store-api

Library will use

- validator
- moment
- mongodb
- express

Arquitetura
    src
        - config
        - infra
            - mongodb
        - domain
        - presentation
            - errors
            - controllers
            - helpers
        - services
            - helpers
            - adapters
        - repositories
        app.js



Entities Banco de dados:
    - movies: name, genre, director, amount.
    - users: name, gender, CPF, birthday, phoneNumber.
    - rents: userId, startDate, endDate, returnDate.
    - histories_rent: userId, movieId, amount, description.

Rules:
    - Apenas maiores de 18 anos podem alugar filmes.
    - Um usuário pode alugar no máximo 5 filmes por vez.
    - O Filme deve estar disponível em estoque.
    - Cliente pode renovar o alguel do mesmo filme apenas 2x.


CRUD Rent:
    rent (get):

    rent (post):
        - Usuário pode alugar no máximo 5 filmes por vez.
        - Filme deve estar disponível em estoque.

    rent (update):

    rentHistories (get):
        

CRUD Movie:
        create (post):
            - Adicionar filmes.

        findAll (get):
            - Buscar todos os filmes disponíveis.

CRUD User: 
        register

        findByCpf

        findByName