import React from 'react';
import { TodosProvider } from './TodosProvider';
import { TodoList } from './TodoList';

export const TodoListWrapper: React.FC = () => (
  <TodosProvider>
    <TodoList />
  </TodosProvider>
);
