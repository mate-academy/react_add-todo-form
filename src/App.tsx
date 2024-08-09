import { useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';

import { TodoExtended } from './types/TodoExtended';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form';

import { getPreparedTodos } from './utils/getPreparedTodos';

export const App = () => {
  const [todoList, setTodoList] = useState<TodoExtended[]>(getPreparedTodos());

  function addTodo(todoData: TodoExtended) {
    setTodoList(prev => [...prev, todoData]);
  }

  const maxTodoId: number = todoList.reduce(
    (max, { id }) => Math.max(max, id),
    0,
  );

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <Form user={usersFromServer} onAdd={addTodo} maxTodoId={maxTodoId} />

      <TodoList todos={todoList} />
    </div>
  );
};
