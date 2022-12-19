# Challenge-Covid-Daily-Cases
Fullstack Challenge 🏅 2022 - Covid Daily Cases
>  This is a challenge by [Coodesh](https://coodesh.com/)

Desafio da Coodesh onde foi desenvolvida uma API para consumir os dados de Covid cadastrados no banco de dados.

![Captura de Tela 2022-12-19 às 16 45 09](https://user-images.githubusercontent.com/107374370/208507503-91c9b373-fb4e-4788-b7d9-c482e2a77b38.png)

Para construção deste projeto, foram utilizadas as seguintes tecnologias:

Front:
> React.js, React Bootstrap, Styled Components, React simple map

Back:
> .NET6 C# + EF Core

Banco de dados:
> SQLite

Comando para armazenar os dados do arquivo csv na base de dados:
```bash
sqlite> .mode csv cases
sqlite> .import covid-variants.csv cases
```
cases é o nome da tabela onde serão armazenadas as informações

Comando para executar o projeto:
```bash
npm run start
```

Comando para executar o Back:
```bash
dotnet run
ou
dotnet watch run
```
