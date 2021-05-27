import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form';

const todoList = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: todoList,
  }

  addTodo = (title, userID) => {
    const newTodo = {
      userId: userID,
      id: this.state.todos[this.state.todos.length - 1].id + 1,
      title,
      completed: false,
      user: users.find(user => user.id === userID),
    };

    this.setState(state => ({
      todos: [...state.todos, newTodo],
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>

        <Form users={users} addTodo={this.addTodo} />
        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <p>
          <span>Todos: </span>
          <TodoList todoList={this.state.todos} />
        </p>
      </div>
    );
  }
}

export default App;
