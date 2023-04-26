<h1 align="center"> Connect Bus Manager Web </h1>

![Imagen ilustrativa](https://d2hucwwplm5rxi.cloudfront.net/wp-content/uploads/2022/06/13054818/Future-of-Mobility-B-13-06-2-1024x640.jpg)

Gerenciador paradas e horários dos ônibus da cidade de Boituva do app Connect Bus

Dominio: https://connectbus-7d8d9.web.app


# Get Started



## Instalando dependências do projeto
<br>

### Instale a interface de linha de comando do Firebase

> Nota : Para instalar a CLI, você precisa instalar o npm que normalmente vem com o [Node.js](https://nodejs.org/en) .

A interface de linha de comando (CLI) do Firebase permite usar o Firebase Hosting ao qual atende o aplicativo da Web **localmente**.

1. Instale a CLI executando o seguinte comando npm:<br>
`npm -g install firebase-tools`
2. Verifique se a CLI foi instalada corretamente executando o seguinte comando: <br>
`firebase --version`<br>
Certifique-se de que a versão do Firebase CLI seja v4.1.0 ou posterior.
3. Autorize a Firebase CLI executando o seguinte comando: <br>
`firebase login`
4. Certifique-se de que sua linha de comando esteja acessando o diretório local do aplicativo.
5. Associe o aplicativo ao projeto do Firebase executando o seguinte comando:<br>
`firebase use --add`
6. Quando solicitado, selecione o **ID do projeto** e atribua um alias ao projeto do Firebase. (o alias pode ser qualquer coisa desde que remeta ao aplicativo)
7. Siga as instruções restantes em na linha de comando.

<br>
<br>



## Execute o projeto
Agora que instalou as dependências do projeto, está pronto para executar o aplicativo da web.
1. Em um console do diretório do aplicativo, execute o seguinte comando Firebase CLI:<br>
`firebase serve --only hosting`
2. Sua linha de comando deve exibir a seguinte resposta:<br>
`✔  hosting: Local server: http://localhost:5000`
Estamos usando o emulador Firebase Hosting para atender o aplicativo localmente. O aplicativo da Web agora deve estar disponível em http://localhost:5000 . Todos os arquivos localizados no subdiretório `public` são servidos.




# Deploy

Para fazer deploy do app execute o comando `firebase deploy`

# Autores
| [<img src="https://avatars.githubusercontent.com/u/64858624?v=4" width=115><br><sub>Jennifer Vasconcelos</sub>](https://github.com/jenniferVCa) |  [<img src="https://avatars.githubusercontent.com/u/88093974?v=4" width=115><br><sub>Pedro Ferreira</sub>](https://github.com/phsFerreira) 
| :---: | :---: 