import './App.scss';
import React, { useState } from 'react';

import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoForm } from './components/TodoForm/Todoform';
import { getUserById } from './components/services/user';
import { TodoList } from './components/TodoList';

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

      <TodoForm onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
