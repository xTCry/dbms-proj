"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole[UserRole["NONE"] = 0] = "NONE";
    UserRole[UserRole["OPERATOR"] = 1] = "OPERATOR";
    UserRole[UserRole["ENGEENER"] = 2] = "ENGEENER";
    UserRole[UserRole["ENGEENER_LEAD"] = 3] = "ENGEENER_LEAD";
    UserRole[UserRole["ADMIN_WAREHOUSE"] = 4] = "ADMIN_WAREHOUSE";
    UserRole[UserRole["ADMIN"] = 5] = "ADMIN";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
/*
    1	Оператор
    2	Инженер
    3	Ведущий инженер
    4	Администратор склада
    5	Администратор
*/
