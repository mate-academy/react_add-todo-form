import React from 'react';
import TodoList from './components/TodoList';

import './App.css';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const todos = [...todosFromServer];

class App extends React.Component {
  state = {
    selectUser: '',
    inputValue: '',
    userError: '',
    inputError: '',
  }

  handleSelect = (event) => {
    this.setState({
      selectUser: event.target.value,
      userError: false,
    });
  };

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value.trim(),
      inputError: false,
    });
  }

  handleSubmit = () => {
    const { selectUser, inputValue } = this.state;

    if (inputValue.length < 1) {
      this.setState({ inputError: true });
    }

    if (selectUser === '') {
      this.setState({ userError: true });
    }

    if (inputValue.length >= 1 && selectUser !== '') {
      todos.push({
        userId: +selectUser,
        id: todos.length + 1,
        title: inputValue,
        completed: false,
      });
      this.setState({
        inputValue: '',
        inputError: '',
      });
    }
  }

  render() {
    const { selectUser, inputValue, userError, inputError } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {usersFromServer.length}
        </p>
        <form className="form">
          <div className="input-container">
            <label htmlFor="addTodo">Todo: </label>
            <input
              name="inputValue"
              type="text"
              id="addTodo"
              placeholder="Enter the title todo"
              value={inputValue}
              onChange={this.handleChange}
              className="input"
            />
            {inputError && (
              <p className="error">Please enter the title</p>
            )}
          </div>

          <select
            name="selectUser"
            value={selectUser}
            onChange={this.handleSelect}
            className="select"
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.id}
                {'. '}
                {user.name}
              </option>
            ))}
          </select>

          {userError && (
            <p className="error">Please choose a user</p>
          )}
          <button
            type="button"
            onClick={this.handleSubmit}
            className="button"
          >
            Add
          </button>
        </form>

        <TodoList
          todos={todos}
        />
      </div>
    );
  }
}

export default App;
