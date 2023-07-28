import React from 'react';

import './App.scss';
import { TodoList } from './components/TodoList';
import { TodoProvider } from './components/TodoConetxt';
import { AddTodoForm } from './components/AddTodoForm';

export const App: React.FC = () => (
  <TodoProvider>
    <TodoList />
    <AddTodoForm />
  </TodoProvider>
);
