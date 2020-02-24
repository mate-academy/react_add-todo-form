import React from 'react';

import './App.css';
import { ToDoList } from './component/ToDoList/ToDoList';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
  state = {
    userTodos: todos,
  };

  updateTodos = (value) => {
    this.setState({
      userTodos: value,
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {users.length}

          <span>Todos: </span>
          {this.state.userTodos.length}
        </p>

        <ToDoList
          users={users}
          userTodos={this.state.userTodos}
          updateTodos={this.updateTodos}
        />
      </div>
    );
  }
}

export default App;
