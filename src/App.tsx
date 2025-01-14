import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';

import { Todo } from './components/types/Todo';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';
import { getUserById } from './services/user';

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [currentTodos, setCurrentTodos] = useState<Todo[]>(todos);

  const addTodo = (newTodo: Todo) => {
    setCurrentTodos(allTodos => [...allTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodo addTodo={addTodo} />
      <TodoList todos={currentTodos} />
    </div>
  );
};
