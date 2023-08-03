# FullStack Notes APP

## Description

The goal of this project is to create a note application that allows the creation of new notes, editing and archiving.

## Authors

* [@juan154850](https://github.com/juan154850)

## Necessary dependencies and technologies

Backend:

* * NodeJs (v18.15.0)
  * Express (v4.18.2)
  * Sequelize (v6.32.1)
  * Sequelize-cli (v6.6.1)
* Database:

  * PostgreSQL (v15)
* Frontend:

  * React (v18.2.0)
  * React-dom (v18.2.0)
  * Vite (v4.4.5)

Execution requirements:
-NodeJs
-PostgreSQL

Once you have NodeJs and PostgreSQL installed on your machine, you can run the following command to run the application. This command will take care of doing all the configuration of your database, organizing the models and putting in some test data. When all the installation is finished you will be able to open your browser at the path: **localhost:5173** to enter the application.

**NOTE**: The API is located in the path **localhost:3000**.

```
npm run install-deps
```

Adicionalmente, usted puede ejecutar el .bat (windows) y .sh (linux) para llevar a cabo toda la instalación de la app.

Una vez haya ejecutado la aplicación por primera vez, si usted la ha cerrado puede usar el siguiente comando para ejecutar la aplicación cargando todas las configuraciones previas.

```
npm run start-dev
```

## API Reference

#### Notes

```
GET /notes
```

* No parameters
* Responses

| Code | Description           |
| :--- | :-------------------- |
| 200  | Successful Response   |
| 500  | Internal Server Error |

```
GET /notes/:id
```

| Parameter | Type | Description    |
| --------- | ---- | -------------- |
| id        | int  | Id of the note |

| Code | Description           |
| ---- | --------------------- |
| 200  | Successful Response   |
| 404  | Not Found             |
| 500  | Internal Server Error |

```
POST /notes
```

* No parameters
* Responses

| Code | Description           |
| ---- | --------------------- |
| 200  | Successful Response   |
| 400  | Validation Error      |
| 500  | Internal Server Error |

```
PUT /notes/:id
```

| Parameter | Type | Description    |
| --------- | ---- | -------------- |
| id        | int  | Id of the note |

| Code | Description           |
| ---- | --------------------- |
| 200  | Successful Response   |
| 400  | Validation Error      |
| 404  | Not Found             |
| 500  | Internal Server Error |

```
DEL /notes/:id
```

| Parameter | Type | Description    |
| --------- | ---- | -------------- |
| id        | int  | Id of the note |

| Code | Description                      |
| ---- | -------------------------------- |
| 204  | No Content (Successful Response) |
| 500  | Internal Server Error            |

**NOTE**: For the **/categories** paths the same parameters and response codes apply, the difference is that this part is in charge of editing everything related to the categories.

For more similar projects and with the use of different technologies you can consult:

* **[https://github.com/juan154850/api_online_shop]()** (API built with Python+FastAPI, contains Login.)
* [https://github.com/juan154850/control_users_api]() (Simple application built with Python + FastAPI for managing the users of a company).
* [https://github.com/juan154850/to-do-project]()-react: ([https://juan154850.github.io/to-do-project-react/]() - ToDos application using localstorage)

Thanks.
