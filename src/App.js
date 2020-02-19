import React from 'react';

import './App.css';
import { ToDoList } from './component/ToDoList/ToDoList';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
  state = {
    UserTodos: todos,
  };

  updateTodos = (value) => {
    this.setState({
      UserTodos: value,
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
          {todos.length}
        </p>

        <ToDoList
          users={users}
          UserTodos={this.state.UserTodos}
          updateTodos={this.updateTodos}
        />
      </div>
    );
  }
}

export default App;
