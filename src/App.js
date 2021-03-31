import React, { Component } from 'react';
import { TodoList } from './components/TodoList';
import './App.scss';

import todos from './api/todos';
import users from './api/users';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends Component {
  state = {
    todos: preparedTodos,
    title: '',
    userId: '',
    selectedUser: null,
    selectedUserError: false,
    emptyTitleError: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { isValidData, addTodo } = this;

    if (isValidData('title') && isValidData('selectedUser')) {
      addTodo();

      return;
    }

    this.setState({
      emptyTitleError: !isValidData('title'),
      selectedUserError: !isValidData('selectedUser'),
    });
  }

  isValidData = key => !!this.state[key];

  addTodo = () => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        {
          title: prevState.title,
          userId: prevState.selectedUser.id,
          id: prevState.todos.length + 1,
          completed: false,
          user: prevState.selectedUser,
        },
      ],
      title: '',
      userId: '',
      selectedUser: null,
      selectedUserError: false,
      emptyTitleError: false,
    }));
  };

  handleChange = (event) => {
    const { value } = event.target;

    this.setState({
      title: value,
      emptyTitleError: false,
    });
  };

  handleSelectUser = (event) => {
    const userId = +event.target.value;

    this.setState({
      selectedUser: users.find(user => user.id === userId),
      selectedUserError: false,
      userId,
    });
  }

  render() {
    const { title, userId, selectedUserError, emptyTitleError } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="inputTitle">
            {`New todo `}
          </label>

          <input
            id="inputTitle"
            type="text"
            placeholder="Enter todo's title"
            value={title}
            onChange={this.handleChange}
          />
          <select
            value={userId}
            onChange={this.handleSelectUser}
          >
            <option value="">
              Choose a user
            </option>
            {users.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
          >
            Add
          </button>

          {emptyTitleError
            && (
              <p className="App__error-message">
                Please enter the title
              </p>
            )
          }

          {selectedUserError
            && (
              <p className="App__error-message">
                Please choose a user
              </p>
            )
          }
        </form>

        <ul className="list">
          <TodoList todos={this.state.todos} />
        </ul>
      </div>
    );
  }
}

export default App;
