import { useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoExtended } from './types/TodoExtended';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form';

import { findUserById } from './utils/findUserById';

const preparedTodos: TodoExtended[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: findUserById(usersFromServer, todo.userId),
  };
});

export const App = () => {
  const [todoList, setTodoList] = useState<TodoExtended[]>(preparedTodos);

  function addTodo(todoData: TodoExtended) {
    setTodoList(prev => [...prev, todoData]);
  }

  const maxTodoId: number = todoList.reduce(
    (max, { id }) => (max < id ? id : max),
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
