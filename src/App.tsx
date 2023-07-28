/* eslint-disable no-console */
import React, { useState } from 'react';

import './App.scss';
import { TodoList } from './components/TodoList';
import { TodoProvider } from './components/TodoConetxt';
import { AddTodoForm } from './components/AddTodoForm';

export const App: React.FC = () => {
  const [hidden, setHidden] = useState(false);

  return (
    <>
      <h1>Todos page</h1>
      <button type="button" onClick={() => setHidden(true)}>
        Hide form
      </button>

      <TodoProvider>
        <h2>Create a todo</h2>
        {!hidden && <AddTodoForm />}
        <TodoList />
      </TodoProvider>
    </>
  );
};
