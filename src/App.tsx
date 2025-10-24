import './App.scss';
import React, { useState } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/TodoForm';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId)!,
    })),
  );

  const handleAdd = (newTodo: Todo) => {
    setTodos(prev => [...prev, newTodo]);
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <AddTodoForm users={usersFromServer} todos={todos} onAdd={handleAdd} />
      <TodoList todos={todos} />
    </div>
  );
};
