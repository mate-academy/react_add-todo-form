import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList/TodoList';

function getUserById(userId) {
  return users.find(user => user.id === userId);
}

const todoWirhUsers = todos.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

class App extends React.Component {
  state = {
    todos: todoWirhUsers,
  };

  addTodo = (todoName, todoUserId) => {
    this.setState((state) => {
      const newTodo = {
        id: todos.length + 1,
        title: todoName,
        userId: todoUserId,
        user: getUserById(+todoUserId),
      };

      return {
        todos: [...state.todos, newTodo],
      };
    });
  };

  render() {
    return (
      <div className="app">
        <h1>Add todo</h1>
        <TodoForm users={users} onAdd={this.addTodo} />
        <h2>Todo list</h2>
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
