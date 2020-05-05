import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';
import TodoList from './components/TodoList/TodoList';

class App extends React.Component {
  state = {
    preparedTodos: todos.map(todo => (
      {
        ...todo,
        user: users.find(user => todo.userId === user.id),
      }
    )),
    newTodoTitle: '',
    selectedUserId: 0,
    hasTitleError: false,
    hasUserIdError: false,
  }

  handleTodoTitle = (event) => {
    this.setState({
      hasTitleError: false,
      newTodoTitle: event.target.value,
    });
  }

  handleUserId = (event) => {
    this.setState({
      hasUserIdError: false,
      selectedUserId: +event.target.value,
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { newTodoTitle, selectedUserId } = this.state;

    if (!newTodoTitle || !selectedUserId) {
      this.setState({
        hasTitleError: !newTodoTitle,
        hasUserIdError: !selectedUserId,
      });

      return;
    }

    this.setState((todo) => {
      const newTodo = {
        id: +new Date(),
        title: todo.newTodoTitle,
        userId: todo.selectedUserId,
        user: users.find(user => todo.selectedUserId === user.id),
      };

      return {
        preparedTodos: [...todo.preparedTodos, newTodo],
        newTodoTitle: null,
        selectedUserId: 0,
      };
    });
  };

  render() {
    const { preparedTodos } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form onSubmit={this.handleFormSubmit}>
          <input
            type="text"
            onChange={this.handleTodoTitle}
          />
          {this.state.hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
          <br />

          <select
            value={this.selectedUserId}
            onChange={this.handleUserId}
          >
            {users.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>

          {this.state.hasUserIdError && (
            <span className="error">Please select a User</span>
          )}
          <br />

          <button type="submit">
            Add new ToDo
          </button>
        </form>

        <p>
          <span>Users: </span>
          {users.length}
        </p>

        <TodoList list={preparedTodos} />
      </div>
    );
  }
}

export default App;
