import React from 'react';
import './App.css';

import users from './api/users';
import { preparedTodos } from './components/PreparedTodos';
import { TodoList } from './components/TodoList/TodoList';

export class App extends React.Component {
state = {
  // todos: preparedTodos,
}

render() {
  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoList todolist={preparedTodos} />

      <p>
        <span>Users: </span>
        {users.length}
      </p>
    </div>
  );
}
}

// export default App;
