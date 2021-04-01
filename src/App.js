import React, { Component } from 'react';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import './App.scss';

import todos from './api/todos';
import users from './api/users';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends Component {
  state = {
    todos: preparedTodos,
  };

  addTodo = (newTodo) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        newTodo,
      ],
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>

        <TodoForm
          addTodo={this.addTodo}
          todoId={this.state.todos.length + 1}
        />

        <TodoList
          todos={this.state.todos}
        />
      </div>
    );
  }
}

export default App;
