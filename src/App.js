import React from 'react';
import './App.css';
import NewTodo from './components/NewTodo/NewTodo';

import users from './api/users';
import todos from './api/todos';

const usersList = users.map(user => ({
  id: user.id,
  name: user.name,
}));

const todosList = todos.map(todo => ({
  ...todo,
  name: users.find(user => user.id === todo.userId).name,
}));

function App() {
  return (
    <div className="App">
      <h1>Add todo form</h1>
      <p>
        <span>Users: </span>
        {users.length}
      </p>
      <NewTodo usersList={usersList} todosList={todosList} />
    </div>
  );
}

export default App;
