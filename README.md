# dbms-proj

Create models by DBMS
```bash
npx sequelize-auto -o "./packages/models/src/models" -d ystu_staq -h localhost -u ystu_admin -x \!@#$%67890 -e mssql -l ts
```

После создания/обновления моделей нужно собрать модуль.
```bash
yarn models:build
```

Так же не забываем билдить утилиты
```bash
yarn utils:build
```
