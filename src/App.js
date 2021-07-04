import React, { Component } from 'react';
import './App.css';

import usersFromApi from './api/users';
import todosFromApi from './api/todos';
import TodoList from './components/TodoList/TodoList';

const prepearedTodos = todosFromApi.map((todo) => {
  const author = usersFromApi.find(user => user.id === todo.userId);

  return {
    ...todo,
    author,
  };
});

class App extends Component {
  state = {
    todos: [...prepearedTodos],
    users: [...usersFromApi],
    selectedUser: '',
    showUserError: false,
    showMessageError: false,
    newTodo: '',
  };

  selectUser = (event) => {
    this.setState({
      selectedUser: event.target.value,
      showUserError: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { selectedUser, newTodo, users, todos } = this.state;

    if (!selectedUser) {
      this.setState({ showUserError: true });

      return;
    }

    if (!newTodo) {
      this.setState({ showMessageError: true });

      return;
    }

    const createTodo = {
      title: newTodo,
      completed: false,
      userId: users.find(user => user.name === selectedUser).id,
      author: users.find(user => user.name === selectedUser),
      id: todos.length + 1,
    };

    this.setState(state => ({
      todos: [...state.todos, createTodo],
      newTodo: '',
    }));
  }

  handleChange = (event) => {
    this.setState({
      newTodo: event.target.value,
      showMessageError: false,
    });
  }

  render() {
    const { todos,
      users,
      selectedUser,
      newTodo,
      showUserError,
      showMessageError } = this.state;

    return (
      <div className="App">
        <h1>TODO List</h1>

        <select
          onChange={this.selectUser}
          valuse={selectedUser}
          className="select-user"
        >
          <option value="">Choose a user</option>
          {users.map(user => (
            <option
              key={user.id}
              value={user.name}
            >
              {user.name}
            </option>
          ))}
        </select>

        {showUserError && (
          <p className="error">Please choose a user</p>
        )}

        <form
          className="new-todo"
          onSubmit={this.handleSubmit}
        >
          <input
            onChange={this.handleChange}
            value={newTodo}
            className="todo-text"
            type="text"
            placeholder="Enter a new task"
          />
          <input className="todo-submit" value="Add" type="submit" />
        </form>

        {showMessageError && (
          <p className="error">Please enter the title</p>
        )}

        <TodoList todos={todos} />

      </div>
    );
  }
}

export default App;
