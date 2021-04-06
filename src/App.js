import React, { Component } from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import { Form } from './components/Form/Form';

import todos from './api/todos';
import users from './api/users';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(human => human.id === todo.userId),
}));

export class App extends Component {
  state = {
    todos: preparedTodos,
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        {
          ...todo,
          id: prevState.todos.length + 1,
        },
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
          />

        </div>
        <div>
          <TodoList todos={this.state.todos} />
        </div>
      </div>
    );
  }
}
