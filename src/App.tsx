import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { NewTodoForm } from './components/newTodoForm/newTodoForm';
import { Todo } from './types';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const getPreperedTodos = (todos: Todo[]) => {
  return todos.map(todo => {
    const user = usersFromServer.find(u => u.id === todo.userId);

    return { ...todo, user };
  });
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const preparedTodos: Todo[] = getPreperedTodos(todos);

  const handleAddTodo = (newTodo: Omit<Todo, 'id'>) => {
    const maxId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;
    const todoWithId = { ...newTodo, id: maxId + 1 };

    setTodos(prevTodos => [...prevTodos, todoWithId]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodoForm users={usersFromServer} onAdd={handleAddTodo} />

      <TodoList todos={preparedTodos} />
    </div>
  );
};
