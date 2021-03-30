import React from 'react';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const preparedTodod = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

export class App extends React.PureComponent {
  state = {
    todos: preparedTodod,
  };

  addTodo = (newTodo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo],
    }));
  };

  render() {
    return (
      <div className="App">
        <h1 className="App__title">Add todo form</h1>

        <p>
          <span>Users :</span>
        </p>

        <Form
          users={users}
          addTodo={this.addTodo}
        />

        <TodoList list={this.state.todos} />

      </div>
    );
  }
}
