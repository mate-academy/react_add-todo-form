import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './Components/TodoList/TodoList';
import { getNames } from './utilities/getNames';

const names = getNames(users);

function App() {
  return (
    <div className="App">
      <h1>Add todo form</h1>

      <p>
        <span>Users: </span>
        {users.length}
      </p>
      <TodoList
        names={names}
        list={todos}
      />
    </div>
  );
}

export default App;
