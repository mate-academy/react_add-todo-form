import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { ToDo } from './types/ToDo';

export const App = () => {
  const [todoList, setTodoList] = useState<ToDo[]>(todosFromServer);

  const addTodo = (todo: ToDo) => {
    setTodoList([...todoList, todo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm addTodo={addTodo} todoList={todoList} />
      <TodoList todos={todoList} />
    </div>
  );
};
