import React, { Component } from 'react';
import './App.css';

import { TodoList } from './components/TodoList';

import users from './api/users';
import todos from './api/todos';
import { Form } from './components/Form';

export class App extends Component {
  state = {
    listOfTodos: todos,
  }

  addnewTodo = (newTodo) => {
    this.setState(state => ({
      listOfTodos: [...state.listOfTodos, newTodo],
    }));
  }

  render() {
    const {
      listOfTodos,
    } = this.state;

    return (
      <div className="App">
        <div
          className="general-info"
        >
          <h3
            className="header"
          >
            General Info
          </h3>
          <p
            className="field"
          >
            <span>People got </span>
            {listOfTodos.length}
            <span> todos</span>
          </p>

          <p
            className="field"
          >
            <span>Amount of users is </span>
            {users.length}
          </p>
        </div>

        <Form
          addnewTodo={this.addnewTodo}
          users={users}
          todos={todos}
        />
        <TodoList todos={listOfTodos.map(todo => ({
          ...todo,
          user: users.find(user => user.id === todo.userId),
        }))}
        />
      </div>
    );
  }
}
