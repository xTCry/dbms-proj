"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRole = void 0;
var AuthRole;
(function (AuthRole) {
    AuthRole[AuthRole["NONE"] = 1] = "NONE";
    AuthRole[AuthRole["USER"] = 2] = "USER";
    AuthRole[AuthRole["STUDENT"] = 4] = "STUDENT";
    AuthRole[AuthRole["TEACHER"] = 8] = "TEACHER";
    AuthRole[AuthRole["DEKAN"] = 16] = "DEKAN";
    AuthRole[AuthRole["ADMIN"] = 32] = "ADMIN";
})(AuthRole = exports.AuthRole || (exports.AuthRole = {}));
/*
    ('Никто', 1)
    ('Пользователь', 2)
    ('Студент', 4)
    ('Преподаватель', 8)
    ('Деканат', 16)
    ('Администратор', 32)
*/ 
