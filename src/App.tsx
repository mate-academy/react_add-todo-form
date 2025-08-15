import { useState } from 'react';

import './App.scss';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { Form } from './components/Form';
import { getUserById } from './services/getUserById';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const todosReady = todos.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const handleAdd = (todo: Todo) => {
    setTodos(prev => {
      return [...prev, todo];
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <Form addTodo={handleAdd} todos={todosReady} users={usersFromServer} />

      <TodoList todos={todosReady} />
    </div>
  );
};
