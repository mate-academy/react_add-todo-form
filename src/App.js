import React, { Component } from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import { Form } from './components/Form/Form';

import todos from './api/todos';
import users from './api/users';

const preparedTodos = todos.map((item) => {
  const user = users.find(human => human.id === item.userId);
  const todo = {
    user,
    ...item,
  };

  return todo;
});

export class App extends Component {
  state = {
    todos: preparedTodos,
  }

  addTodo = (todo, formTitle, formUserID) => {
    if (todo === undefined) {
      return;
    }

    const newTodo = {
      id: this.state.todos.length + 1,
      ...todo,
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
