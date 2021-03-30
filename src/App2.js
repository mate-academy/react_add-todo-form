import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import todos from './api/todos';

import users from './api/users';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => todo.userId === user.id),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    selectedUser: '',
    titletext: '',
  }

  setUser = (event) => {
    this.setState({
      selectedUser: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const newTodo = {
      id: this.state.todos.length + 1,
      userId: users.find(user => user.name === this.state.selectedUser).id,
      title: this.state.titletext,
      completed: false,
      user: users.find(user => user.name === this.state.selectedUser),
    };

    this.setState(state => ({
      todos: [...state.todos, newTodo],
    }));
  }

  handleChange = (event) => {
    this.setState({
      titletext: event.target.value,
    });
  }

  render() {
    const { selectedUser, titletext } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="title"
            value={titletext}
            onChange={this.handleChange}
          />

          <select
            value={selectedUser}
            onChange={
              this.setUser
            }
          >
            <option value="">Choose a user</option>
            {users.map(user => (
              <option
                value={user.name}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
          >
            Add new TODOs
          </button>
        </form>

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
