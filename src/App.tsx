import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';

function getUser(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todosWithUser: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState(todosWithUser);

  const handleAddTodo = (title: string, userId: number) => {
    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title,
      userId,
      completed: false,
      user: getUser(userId),
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todos} users={usersFromServer} />
    </div>
  );
};
