import React from 'react';
import './App.css';

import users from './api/users';
import { TodoList } from './components/TodoList';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoList />

      <p>
        <span>Users: </span>
        {users.length}
      </p>
    </div>
  );
};

export default App;
