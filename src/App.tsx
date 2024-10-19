import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { Todo } from './types/todo';

export const App = () => {
  function getUserById(userId: number) {
    return usersFromServer.find(user => user.id === userId);
  }

  const todosList = [...todosFromServer].map(todo => ({
    ...todo,
    user: getUserById(todo.userId) || null,
  }));

  const [todos, setTodos] = useState(todosList);

  const handleTodoList = (newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <TodoForm toAdd={handleTodoList} todos={todos} />
      <TodoList todos={todos} />
    </div>
  );
};
