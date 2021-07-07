import React from 'react';
import './App.css';
import users from './api/users';
import todos from './api/todos';
import Form from './components/Form';

function App() {
  const prepearedTodos = todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }));

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <Form users={users} todos={prepearedTodos} />
    </div>
  );
}

export default App;
