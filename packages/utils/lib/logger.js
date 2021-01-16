"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slog = exports.olog = void 0;
const ololog_1 = __importDefault(require("ololog"));
const signale_1 = require("signale");
exports.olog = ololog_1.default.configure({
    time: true,
    tag: true,
});
exports.slog = new signale_1.Signale({
    disabled: false,
    interactive: false,
});
exports.slog.config({
    displayFilename: true,
    displayTimestamp: true,
    displayDate: false,
});
process.on('uncaughtException', (e) => {
    exports.olog.bright.red.error.noLocate(e);
});
process.on('unhandledRejection', (e) => {
    exports.olog.bright.red.error.noLocate(e);
});
