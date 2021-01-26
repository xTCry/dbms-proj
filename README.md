<h1 align="center">dbms-proj</h1>
<p align="center">
    <img alt="GitHub" src="https://img.shields.io/github/repo-size/xTCry/dbms-proj"> 
    <img alt="GitHub repo size" src="https://img.shields.io/github/license/xTCry/dbms-proj">
    <img alt="GitHub issues" src="https://img.shields.io/github/issues/xTCry/dbms-proj">
</p>
<h4 align="center">Курсовой проект по <b>СУБД</b></h4>

---
Версия `Node JS >= v14`

Для установки зависемостей достаточно запустить команду
```bash
yarn
```


После первого запуска сервера в каталоге `server` создается шаблон для конфигурации - `config.json`. Его необходимо настроить под себя.

Автоматическое создание моделей sequelize по выбранной БД
```bash
npx sequelize-auto -o "./packages/models/src/models" -d ystu_staq -h localhost -u ystu_admin -x \!@#$%67890 -e mssql -l ts
```
* ystu_staq - имя БД
* ystu_admin - имя пользователя БД
* `!@#$%67890` - пароль пользователя БД


После создания/обновления моделей нужно собрать модуль моделей.
```bash
yarn models:build
```

Также не забываем собирать Utils
```bash
yarn utils:build
```

Для запуска сервера и клиента в режиме разработки запускаем по этим командам (две консоли)
```bash
yarn client:start
yarn server:dev
```

Для запуска севрера в dev режиме может понадобиться пакет `nodemon`
```bash
npm i -g nodemon
```

<p align="center">
    <a href="https://asciinema.org/a/cgLzEYAgKOR2j4EoXvCAAVsZF" target="_blank">
        <img src="https://asciinema.org/a/cgLzEYAgKOR2j4EoXvCAAVsZF.svg" />
    </a>
</p>

Для запуска клиента на сервере в продакшн запускаем по этим командам (по итогу одна консоль)
```bash
yarn client:build
yarn server:start
```
