import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoForm } from './components/todoForm';
import { TodosList } from './components/todosList';

const getUserById = userId => users.find(user => user.id === userId);

const prepairTodos = todos.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

class App extends React.Component {
  state = {
    todos: prepairTodos,
  };

  addTodo = (todoTitle, userId) => {
    const newId = this.state.todos.length + 1;

    const newTodo = {
      id: newId,
      title: todoTitle,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    this.setState(state => ({
      todos: [...state.todos, newTodo],
    }));
  }

  render() {
    return (
      <div className="App">
        <TodoForm onAdd={this.addTodo} users={users} />
        <TodosList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
