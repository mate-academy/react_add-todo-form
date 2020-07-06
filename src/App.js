import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';

import { TodoList } from './components/TodoList/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(person => person.id === +todo.userId),
}));

export class App extends React.Component {
  state = {
    todos: [...preparedTodos],
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        todo,
      ],
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <div className="App__todos">
          <NewTodo todos={this.state.todos} addTodo={this.addTodo} />
          <TodoList todos={this.state.todos} />
        </div>
      </div>
    );
  }
}
