import React from 'react';

import { AddTodosForm } from './components/addTodosForm';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todosNew: [...preparedTodos],
  }

  render() {
    const {
      todosNew,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <AddTodosForm
          users={users}
          todos={todosNew}
        />
      </div>
    );
  }
}

export default App;
