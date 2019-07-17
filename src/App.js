import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api.todos';

class App extends React.Component {
  state = {
    todos: [],
  }

  render() {
    return (
      <div className="App">
        <h1>Static list of todos</h1>

        <p>
          <span>Users: </span>
          {users.length}
        </p>
      </div>
    );

  }
}

export default App;
