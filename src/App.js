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
    const { listOfTodos } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
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
        <p>
          <span>Todos: </span>
          {listOfTodos.length}
        </p>

        <p>
          <span>Users: </span>
          {users.length}
        </p>
      </div>
    );
  }
}
