import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';
import NewTodo from './NewTodo';
import TodoList from './TodoList';

const preparedTodos = todos.map(item => ({
  ...item, user: users.find(user => user.id === item.userId),
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

        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <NewTodo addTodo={this.addTodo} />
        <TodoList items={this.state.todos} />
      </div>
    );
  }
}

export default App;
