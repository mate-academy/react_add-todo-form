import React from 'react';
import './App.css';

import users from './api/users';
import existingTodos from './api/todos';

import { TodoList } from './components/TodoList/TodoList';

const preparedTodos = existingTodos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

const { v4: uuidv4 } = require('uuid');

class App extends React.Component {
  state = {
    todos: preparedTodos,
    userId: null,
    title: '',
    isUserEmpty: false,
    isTitleEmpty: false,
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.state.userId && !this.state.title) {
      this.setState({
        isUserEmpty: true,
        isTitleEmpty: true,
      });

      return;
    }

    if (!this.state.userId) {
      this.setState({
        isUserEmpty: true,
      });

      return;
    }

    if (!this.state.title) {
      this.setState({
        isTitleEmpty: true,
      });

      return;
    }

    this.setState(prevState => ({
      todos: [...prevState.todos, {
        id: uuidv4(),
        title: prevState.title,
        completed: false,
        userId: +prevState.userId,
        user: users.find(user => user.id === +prevState.userId),
      },
      ],

      userId: '',
      title: '',
    }));
  };

  setName = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      isUserEmpty: false,
    });
  };

  setTitle = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      isTitleEmpty: false,
    });
  };

  render() {
    const {
      todos,
      userId,
      title,
      isUserEmpty,
      isTitleEmpty,
    } = this.state;

    return (
      <>
        <form onSubmit={!isUserEmpty
          && !isTitleEmpty
          && this.handleSubmit}
        >
          <div className="todos">
            <div className="todos__error">
              <p className="error">
                {isUserEmpty && 'Please choose a user'}
              </p>
              <p className="error">
                {isTitleEmpty && 'Please enter a title'}
              </p>
            </div>
            <div className="todos__inputs">
              <label className="input__item">
                User:
                {' '}
                <select
                  name="userId"
                  value={userId}
                  onChange={this.setName}
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
              </label>
              {' '}
              <label className="input__item">
                Title:
                {' '}
                <input
                  type="text"
                  name="title"
                  placeholder="Enter the title"
                  value={title}
                  onChange={this.setTitle}
                />
              </label>
              {' '}
              <button
                type="submit"
                className="input__button"
              >
                Add
              </button>
            </div>
          </div>
        </form>
        <TodoList todos={todos} />
      </>
    );
  }
}

export default App;
