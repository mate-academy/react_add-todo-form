import React, { Component } from 'react';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form';
import todos from './api/todos';
import users from './api/users';
import './App.css';

const todosWithUsers = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends Component {
  state = {
    todos: todosWithUsers,
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
      <div className="app">
        <h1>Add todo form</h1>
        <Form users={users} addTodo={this.addTodo} />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
