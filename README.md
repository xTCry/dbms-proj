# dbms-proj

Курсовой проект по **СУБД**

Для установки зависемостей достаточно запустить команду
```bash
yarn
```

Версия `Node JS >= v14`

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

Для запуска клиента на сервере в продакшн запускаем по этим командам (по итогу одна консоль)
```bash
yarn client:build
yarn server:start
```
