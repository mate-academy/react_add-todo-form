import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { AddForm } from './components/AddForm';

function App() {
  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>
      <AddForm allTodos={[...todos]} allUsers={users} />
      <p>
        <span>Users: </span>
        {users.length}
      </p>
    </div>
  );
}

export default App;
