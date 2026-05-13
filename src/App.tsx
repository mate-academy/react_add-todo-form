import './App.scss';

import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { useState } from 'react';
import { TodoForm } from './components/TodoForm/TodoForm';
import type { Todo } from './types';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId)!,
    })),
  );

  const addTodo = (newTodo: Todo): void => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm todos={todos} users={usersFromServer} onAdd={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
