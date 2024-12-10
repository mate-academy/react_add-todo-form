import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { TodoForm } from './components/TodoForm';

import todosFromServer from './api/todos';
import { TodoWithUser } from './types/todo';
import { getUserById } from './servises/userService';

function generateId(todos: TodoWithUser[]) {
  const maxId = Math.max(...todos.map(todo => todo.id))

  return maxId + 1;
}

const initialTodos: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(initialTodos);

  const addTodo = ({ id, ...data}: TodoWithUser) => {
    const newTodo = {
      id: generateId(todos),
      ...data,
    }

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
