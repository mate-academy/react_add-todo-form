import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm/Index';
import todos from './api/todos';
import 'bulma';

import users from './api/users';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => todo.userId === user.id),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
  }

  addTodo = (todo) => {
    this.setState(state => ({
      todos: [...state.todos, todo],
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>

        <AddTodoForm
          todos={this.state.todos}
          onAdd={this.addTodo}
        />

        <div>
          <TodoList todos={this.state.todos} />
          <span>Users: </span>
          {users.length}
        </div>
      </div>
    );
  }
}

export default App;
