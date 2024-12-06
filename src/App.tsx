import './App.scss';
import { useState } from 'react';

import { Todo } from './types';

import { Form } from './components/Form';
import { TodoList } from './components/TodoList';

import { getUserFromTodo } from './utils/getUserFromTodo';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const todosList = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserFromTodo(usersFromServer, todo),
  };
});

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosList);

  const onAdd = (todo: Todo) => {
    setTodos(prevTodos => [...prevTodos, todo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <Form users={usersFromServer} todos={todos} onAddTodo={onAdd} />

      <TodoList todos={todos} />
    </div>
  );
};
