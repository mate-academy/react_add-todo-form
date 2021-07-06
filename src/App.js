import React from 'react';
import './App.css';
import NewTodo from './components/NewTodo';

import users from './api/users';
import todos from './api/todos';

function App() {
  return (
    <div className="App">
      <NewTodo users={users} todos={todos} />
    </div>
  );
}

export default App;
