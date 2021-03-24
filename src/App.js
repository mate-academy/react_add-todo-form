import React, { Component } from 'react';
import './App.css';

import { TodoList } from './Components/TodoList';
import { AddTodoForm } from './Components/AddTodoForm';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends Component {
  state = {
    todos: preparedTodos,
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <AddTodoForm
          todos={this.state.todos}
          users={users}
          addTodo={this.addTodo}
        />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
