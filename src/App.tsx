import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import todosFromServer from './api/todos';
import { Todo } from './type/Todo';
import { getUserById } from './services/getUserById';
import { TodoForm } from './components/TodoForm';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (newTodo: Todo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm todos={todos} onAdd={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
