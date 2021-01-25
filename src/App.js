import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
  }

  addTodo = (title, user) => {
    this.setState((prevState) => {
      const todoNew = {
        userId: user.id,
        id: this.state.todos.length + 1,
        title,
        completed: false,
        user,
      };

      return {
        todos: [...prevState.todos, todoNew],
      };
    });
  }

  render() {
    return (
      <div className="app">
        <TodoForm
          users={users}
          addTodo={this.addTodo}
        />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
