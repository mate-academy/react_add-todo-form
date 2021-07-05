import React from 'react';
import { AddTaskForm } from './components/AddTaskForm/AddTaskForm';

import './App.css';

import users from './api/users';
import todos from './api/todos';

const App = () => (
  <div
    className="App mx-auto jumbotron"
    style={{ width: '75%' }}
  >
    <h1
      className="display-4"
      style={{ textAlign: 'center' }}
    >
      Add todo form
    </h1>

    <p
      className="lead"
      style={{ textAlign: 'center' }}
    >
      <b>Users: </b>
      {users.length}
    </p>

    <p style={{ textAlign: 'center' }} />
    <hr className="my-4" />

    <AddTaskForm
      users={users}
      todos={todos}
    />
  </div>
);

export default App;
