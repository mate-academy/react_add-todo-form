import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import todos from './api/todos';
import users from './api/users';

createRoot(document.getElementById('root') as HTMLElement).render(
  <App todosFromServer={todos} users={users} />,
);
