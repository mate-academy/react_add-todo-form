import React from 'react';
import './App.css';

import users from './api/users';

import { TodoForm } from './components/TodoForm';

const App = () => (
  <div className="App">
    <h1>
      to
      <span>do</span>
    </h1>

    <p>
      <span>
        Users:
        {users.length}
      </span>
    </p>

    <TodoForm
      users={users}
    />
  </div>
);

export default App;
