# Tablas de endpoints
## Users (/auth)

| Method |    Path    |           Body           | Querys |   Output    |
| :----: | :--------: | :----------------------: | :----: | :---------: |
|  GET   | /:username |                          |        |    User     |
|  POST  | /:username | User(username, password) |        |    User     |
|  PUT   | /:username |           User           |        |    User     |
| DELETE | /:username |          userid          |        | controlcode |
|  POST  |   /login   |    username, password    |        |    User     |
|  POST  |  /logout   |           User           |        | controlcode |

## Content (/content)

| Method |          Path          |  Body   | Querys |     Output     |
| :----: | :--------------------: | :-----: | :----: | :------------: |
|  GET   |      /:contentid       |         |        |    Content     |
|  POST  |  /:contentid/comment   | Comment |        |  controlcode   |
|  POST  |  /:conteintid/review   | Review  |        |  controlcode   |
|  GET   | /:contentid/characters |         |        | characterslist |
|  GET   |  /:contentid/episodes  |         |        |  episodeslist  |
