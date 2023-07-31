import React from 'react';

import './App.scss';
import { TodoList } from './components/TodoList';
import { TodoProvider } from './components/TodoContext';
import { AddTodoForm } from './components/AddTodoForm';
import { UsersProvider } from './components/UsersContext';

export const App: React.FC = () => (
  <UsersProvider>
    <TodoProvider>
      <TodoList />
      <AddTodoForm />
    </TodoProvider>
  </UsersProvider>
);
