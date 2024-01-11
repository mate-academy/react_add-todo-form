/* eslint-disable @typescript-eslint/quotes */
import { useState } from "react";
import { findUserById } from "./services/User";
import { Todo } from "./types/Todo";
import { TodoForm } from "./components/TodoForm/TodoForm";
import { TodoList } from "./components/TodoList";

import todosFromServer from "./api/todos";
import "./App.scss";

export const App = () => {
  const todosInfo = todosFromServer.map((todo) => ({
    ...todo,
    user: findUserById(todo.userId),
  }));

  const [todoList, setTodoList] = useState<Todo[]>(todosInfo);

  const maxTodoId = (todos: Todo[]) => {
    return Math.max(...todos.map((todo) => todo.id)) + 1;
  };

  const addTodo = ({ id, ...data }: Todo) => {
    const newTodo = {
      id: maxTodoId(todoList),
      ...data,
    };

    setTodoList((currentList) => [...currentList, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} />
      <TodoList todos={todoList} />
    </div>
  );
};
