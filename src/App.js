import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoLists';

function App() {
  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoList users={users} todos={todos} />
      <p>
        <span>Users: </span>
        {users.length}
      </p>
    </div>
  );
}

export default App;
