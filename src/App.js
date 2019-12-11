import React from 'react';
import './App.css';
import NewTodo from './NewTodo';
import users from './api/users';
import todos from './api/todos';

const todosWithUsers = todos.map(item => ({
  ...item,
  user: users.find(user => user.id === item.userId),
}));

function App() {
  return (
    <div className="block">
      <h1 className="form__title">TODO form</h1>
      <NewTodo users={users} todosWithUsers={todosWithUsers} />
    </div>
  );
}

export default App;
