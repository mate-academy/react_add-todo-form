import React from 'react';
import './App.css';

import { NewTodo } from './components/NewTodo';

import users from './api/users';
import todosFromServer from './api/todos';

function App() {
  return (
    <div className="App">
      <p>
        <span>Users: </span>
        {users.length}
      </p>

      <NewTodo users={users} todosFromServer={todosFromServer} />
    </div>
  );
}

export default App;
