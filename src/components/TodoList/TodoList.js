"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoList = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var TodoInfo_1 = require("../TodoInfo");
var TodoList = function (_a) {
    var todos = _a.todos;
    return ((0, jsx_runtime_1.jsx)("section", { className: "TodoList", children: todos.map(function (todo) {
            return (0, jsx_runtime_1.jsx)(TodoInfo_1.TodoInfo, { todo: todo }, todo.id);
        }) }));
};
exports.TodoList = TodoList;
