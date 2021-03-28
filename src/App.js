import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';
import TodoList from './components/TodoList';
import { TodosForm } from './components/TodosForm';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

export class App extends React.Component {
  state = {
    todo: preparedTodos,
  };

  addTodos = (newTodo) => {
    this.setState(prevState => ({
      todo: [...prevState.todo, newTodo],
    }));
  };

  render() {
    const { todo } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <TodosForm
          users={users}
          onSubmit={this.addTodos}
        />
        <TodoList todos={todo} />
        <p>
          <span>Users: </span>
          {users.length}
        </p>
      </div>
    );
  }
}
