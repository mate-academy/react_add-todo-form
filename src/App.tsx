import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoExtanded } from './types/TodoExtandes';
import { Form } from './components/Form';
import { useState } from 'react';
import { findUserById } from './utils/findUserById';

const preparedTodos: TodoExtanded[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: findUserById(usersFromServer, todo.userId),
  };
});

export const App = () => {
  const [todoList, setTodoList] = useState<TodoExtanded[]>(preparedTodos);

  function addTodo(todoData: TodoExtanded) {
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
