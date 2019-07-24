/* eslint-disable */
import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import TodoList from './components/TodoList';
import NewToDo from './components/NewToDo';

class App extends React.Component {
  state = {
    todos: [...todos],
    users: [...users],
  };

  addUserAndTodo = (obj) => {
    this.setState(prevState => ({
      todos: prevState.todos.concat(obj),
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <p>
          <span>Users: </span>
          {this.state.users.length}
        </p>
        <NewToDo
          users={this.state.users}
          addUserAndTodo={this.addUserAndTodo}
        />
        <TodoList
          users={this.state.users}
          todos={this.state.todos}
        />
      </div>
    );
  }
}

export default App;
