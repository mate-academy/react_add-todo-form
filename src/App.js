/* eslint-disable arrow-parens */
import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';
import { AddTodo } from './components/AddTodo.js';

class App extends React.Component {
  state = {
    todoList: todos,
  };

  addTodo = (todo) => {
    this.setState((state) => ({
      todoList: [...state.todoList, todo],
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <AddTodo users={users} addTodo={this.addTodo} />

        <div className="todo-container">
          <h2>Todos: </h2>
          <TodoList todos={this.state.todoList} />
        </div>
      </div>
    );
  }
}

export default App;
