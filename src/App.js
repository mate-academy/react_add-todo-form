import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form';

const prepTodos = todos.map((todo) => {
  const user = users.find(newUser => todo.userId === newUser.id);

  return {
    ...todo,
    user,
  };
});

class App extends React.Component {
  state = {
    todos: prepTodos,
  }

  addTodo = (title, userId, user) => {
    this.setState((state) => {
      const newTodo = {
        userId,
        id: this.state.todos.length + 1,
        title,
        completed: false,
        user,
      };

      return {
        todos: [...state.todos, newTodo],
      };
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <Form addTodo={this.addTodo} />
        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
