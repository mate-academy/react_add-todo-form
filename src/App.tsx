import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form/Form';
import { useState } from 'react';
import { Todo } from './types/Todo';
import { getUserById } from './services/user';

const maxId = Math.max(...todosFromServer.map(todo => todo.id), 0);

export const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [users] = useState(usersFromServer);

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodo => [...currentTodo, { ...newTodo, id: maxId + 1 }]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <Form onSubmit={addTodo} users={users} maxId={maxId} />
      <TodoList todos={todos} />
    </div>
  );
};
