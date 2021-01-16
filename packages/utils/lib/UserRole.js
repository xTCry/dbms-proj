"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole[UserRole["NONE"] = 1] = "NONE";
    UserRole[UserRole["USER"] = 2] = "USER";
    UserRole[UserRole["STUDENT"] = 3] = "STUDENT";
    UserRole[UserRole["TEACHER"] = 4] = "TEACHER";
    UserRole[UserRole["DEKAN"] = 5] = "DEKAN";
    UserRole[UserRole["ADMIN"] = 6] = "ADMIN";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
/*
    ('Никто', 1)
    ('Пользователь', 2)
    ('Студент', 4)
    ('Преподаватель', 8)
    ('Деканат', 16)
    ('Администратор', 32)
*/ 
