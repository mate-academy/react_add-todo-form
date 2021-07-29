import React, { Component } from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import { TodosList } from './components/TodoList/TodoList';
import Form from './components/Form/Form';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => todo.userId === user.id),
}));

class App extends Component {
  state = {
    todos: preparedTodos,
  }

  addTodo = newTodo => this.setState(prevState => ({
    todos: [
      ...prevState.todos,
      {
        ...newTodo,
        id: prevState.todos.length + 1,
      },
    ],
  }))

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <TodosList todos={this.state.todos} />
        <Form addTodo={this.addTodo} />

      </div>
    );
  }
}

export default App;
