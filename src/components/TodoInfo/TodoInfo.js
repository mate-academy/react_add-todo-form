"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoInfo = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var users_1 = require("../../api/users");
var classnames_1 = require("classnames");
var TodoInfo = function (_a) {
    var todo = _a.todo;
    var chosenUser = users_1.default.find(function (user) { return user.id === todo.userId; });
    return ((0, jsx_runtime_1.jsxs)("article", { "data-id": todo.id, className: (0, classnames_1.default)('TodoInfo', {
            'TodoInfo--completed': todo.completed,
        }), children: [(0, jsx_runtime_1.jsx)("h2", { className: "TodoInfo__title", children: todo.title }), chosenUser && ((0, jsx_runtime_1.jsx)("a", { className: "UserInfo", href: "mailto:".concat(chosenUser.email), children: chosenUser.name }))] }));
};
exports.TodoInfo = TodoInfo;
