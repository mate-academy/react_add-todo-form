import React from 'react';
import TodoList from './TodoList';
import './App.css';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

class App extends React.Component {
  state ={ }

  render() {
    return (
      <div className="App">
        <TodoList
          todos={todosFromServer}
          users={usersFromServer}
        />
      </div>
    );
  }
}

export default App;
