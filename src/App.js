import React from 'react';
import './App.css';

import todosFromServer from './api/todos';
import users from './api/users';

import { TodoList } from './components/TodoList';

const usersFromServer = [...users];

class App extends React.Component {
  state = {
    todos: [...todosFromServer],
    inputValue: '',
    selectValue: '',
    emptyTitleMessage: '',
    emptyUserMessage: '',
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'inputValue') {
      this.setState({
        [name]: value,
        emptyTitleMessage: '',
      });
    }

    if (name === 'selectValue') {
      this.setState({
        [name]: value,
        emptyUserMessage: '',
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { inputValue, selectValue } = this.state;
    const selectedUser = usersFromServer
      .find(user => user.name === selectValue);

    if (inputValue.trim().length > 0 && selectValue.length > 0) {
      this.setState(state => ({
        todos: [
          ...state.todos,
          {
            userId: selectedUser.id,
            id: state.todos.length + 1,
            title: inputValue,
            completed: false,
          },
        ],
        inputValue: '',
        selectValue: '',
        emptyTitleMessage: '',
        emptyUserMessage: '',
      }));
    }

    if (inputValue.trim().length === 0) {
      this.setState({ emptyTitleMessage: 'Please enter the title' });
    }

    if (selectValue.length === 0) {
      this.setState({ emptyUserMessage: 'Please choose a user' });
    }
  }

  render() {
    const { todos, emptyTitleMessage, emptyUserMessage } = this.state;

    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <div className="container">
            <input
              type="text"
              name="inputValue"
              value={this.state.inputValue}
              placeholder="Enter the title"
              onChange={this.handleChange}
            />
            <span className="error-message">{emptyTitleMessage}</span>
          </div>

          <div className="container">
            <select
              name="selectValue"
              value={this.state.selectValue}
              onChange={this.handleChange}
            >
              <option value="">
                Choose a user
              </option>

              {usersFromServer.map(user => (
                <option value={user.name} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <span className="error-message">{emptyUserMessage}</span>
          </div>

          <button className="button" type="submit">
            Add todo
          </button>
        </form>
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
