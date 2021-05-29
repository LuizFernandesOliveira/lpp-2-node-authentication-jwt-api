# #2 Authentication with JWT

<img src="https://raw.githubusercontent.com/robsonkades/vscode-express-snippets/master/images/node.png" alt="linguagem" width="80px"/>

### Problemática

criar um API que rode na porta 3333 que tenha um C.R.U.D. de Usuário e que para acessar os R.U.D. o usuário deve ter um token fornecido por uma autenticação feita com o JWT.

**Recursos**
- `HTTP/1.1 POST /users`

    ```json
    REQUEST
    {
    	"name": "Luiz Fernandes de Oliveira",
    	"email": "luizfernandesoliveiraoficial@gmail.com",
    	"password": "luiz123"
    }
    RESPONSE
    {
    	"id": 1,
    	"name": "Luiz Fernandes de Oliveira",
    	"email": "luizfernandesoliveiraoficial@gmail.com",
    	"password": "luiz123"
    }
    ```

- `HTTP/1.1 POST /token`

    ```json
    REQUEST
    {
    	"email": "luizfernandesoliveiraoficial@gmail.com",
    	"password": "luiz123"
    }
    RESPONSE
    {
    	"token": "09ja0js09u893u.q99isisu28jjadsioio.901io211ioeno"
    }
    ```

- `HTTP/1.1 GET /user`

    ```json
    RESPONSE
    {
    	"id": 1,
    	"name": "Luiz Fernandes de Oliveira",
    	"email": "luizfernandesoliveiraoficial@gmail.com",
    	"password": "luiz123"
    }
    ```

- `HTTP/1.1 PUT /user`

    ```json
    REQUEST
    {
    	"nome": "Nando"
    }
    RESPONSE
    {
    	"id": 1,
    	"name": "Nando",
    	"email": "luizfernandesoliveiraoficial@gmail.com",
    	"password": "luiz123"
    }
    ```

- `HTTP/1.1 DELETE /user`

    ```json
    RESPONSE
    {
    	"message": "successfully deleted"
    }
    ```