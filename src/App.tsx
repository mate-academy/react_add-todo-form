import './App.scss';
import { AddTodoForm } from './components/AddTodoForm/AddTodoForm';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';

function getUserByID(userId: number) {
  return usersFromServer.find(user => user.id === userId);
}

const array = todosFromServer.map(todo => ({
  ...todo,
  user: getUserByID(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(array);

  const addTodo = (title: string, userId: number) => {
    const id = Math.max(...todos.map(todo => todo.id)) + 1;

    setTodos([
      ...todos,
      { title, user: getUserByID(userId), id, completed: false, userId },
    ]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddTodoForm addTodo={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
