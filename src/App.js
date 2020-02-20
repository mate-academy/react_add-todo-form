import React, { Component } from 'react';
import { NewTodo } from './NewTodo';
import { TodoList } from './TodoList';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const todoWithUsers = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

const uuid = require('uuid/v1');

class App extends Component {
  state = {
    todos: [...todoWithUsers],
  }

  addNewTodo = (title, userName) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        {
          title,
          id: uuid(),
          user: { name: userName },
        },
      ],
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Add Todo Form</h1>
        <NewTodo users={users} addNewTodo={this.addNewTodo} />
        <div className="todo">
          <TodoList todos={this.state.todos} />
        </div>
      </div>
    );
  }
}

export default App;
