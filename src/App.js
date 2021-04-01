import React, { Component } from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import { Form } from './components/Form/Form';

import todos from './api/todos';
import users from './api/users';

const preparedTodos = todos.map(item => ({
  ...item,
  user: users.find(human => human.id === item.userId),
}));

export class App extends Component {
  state = {
    todos: preparedTodos,
  }

  addTodo = (todo) => {
    const newTodo = {
      ...todo,
      id: this.state.todos.length + 1,
    };

    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        newTodo,
      ],
    }));
  }

  render() {
    return (
      <div className="App">
        <div>
          <h1>List of todos</h1>

          <Form
            users={users}
            onSubmit={this.addTodo}
            onAdd={this.addTodo}
          />

        </div>
        <div>
          <TodoList props={this.state.todos} />
        </div>
      </div>
    );
  }
}
