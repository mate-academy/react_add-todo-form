import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types';
import { useState } from 'react';
import { TodoForm } from './components/TodoForm';

export function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todosWithUsers = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUsers);

  const handleAddTodo = (newTodo: Todo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm
        onAdd={handleAddTodo}
        maxId={Math.max(...todos.map(todo => todo.id))}
      />

      <TodoList todos={todos} />
    </div>
  );
};
