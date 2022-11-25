## Execute o projeto usando Docker

Defina o arquivo .env na raiz do diretório com base no arquivo .env.example, utilize um JWT SECRET secreto para gerar os tokens jwt.</br>
Execute os comandos abaixo.

`docker build . -t viniciuspiresb/mks-backend-challange`
`docker-compose up`

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Experiência profissional

Já havia trabalhado bastante com o Typescript, por esse motivo senti que consigo cumprir esse desafio, também ja havia utilizado o banco de dados Postgres e realizei implementações utilizando Docker.<br><br>
Foi minha primeira vez utilizando o framework Nest.js, porém como já havia implementado varias APIs utilizando o Express do Node.js, então foi de fácil compreensão usando a documentação do framework para me orientar.<br><br>
Também foi a primeira vez utilizando o TypeORM, mas ele foi bastante similar ao PRISMA, que já havia utilizado na criação de outras APIs.<br><br>
Não havia utilizado o Swagger e também não o conhecia, foi interessante ver o que ele é capaz de fazer com poucas linhas de código.<br><br>
Não foi possível importar o Redis no módulo de Cache do framework, mas toda a parte de Cache foi realizada.<br><br>
A aplicação não foi completamente testada por falta de tempo.
