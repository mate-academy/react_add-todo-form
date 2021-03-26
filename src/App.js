import React from 'react';
import './App.css';

import { TodoList } from './components/TodoList';

import users from './api/users';
import initialTodos from './api/todos';

const preparedTodos = initialTodos.map(activity => ({
  ...activity,
  user: users.find(user => user.id === activity.userId),
}));

const { uuid } = require('uuidv4');

class App extends React.Component {
  state = {
    todos: preparedTodos,
    userId: null,
    title: '',
    isUserAbsent: false,
    isTitleAbsent: false,
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.state.userId && !this.state.title) {
      this.setState({
        isUserAbsent: true,
        isTitleAbsent: true,
      });

      return;
    }

    if (!this.state.userId) {
      this.setState({
        isUserAbsent: true,
      });

      return;
    }

    if (!this.state.title) {
      this.setState({
        isTitleAbsent: true,
      });

      return;
    }

    this.setState(prevState => ({
      todos: [...prevState.todos, {
        id: uuid(),
        title: prevState.title,
        completed: false,
        userId: Number(prevState.userId),
        user: users.find(user => user.id === Number(prevState.userId)),
      },
      ],

      userId: '',
      title: '',
    }));
  };

  handleChangeName = (event) => {
    const {
      name, value,
    } = event.target;

    this.setState({
      [name]: value,
      isUserAbsent: false,
    });
  };

  handleChangeTitle = (event) => {
    const {
      name, value,
    } = event.target;

    this.setState({
      [name]: value,
      isTitleAbsent: false,
    });
  };

  render() {
    const {
      todos,
      userId,
      title,
      isUserAbsent,
      isTitleAbsent,
    } = this.state;

    return (
      <div className="form">
        <form onSubmit={!isUserAbsent
          && !isTitleAbsent
          && this.handleSubmit}
        >
          <div className="activities">
            <p className="error">
              {isUserAbsent && 'Please choose a user'}
            </p>
            <p className="error">
              {isTitleAbsent && 'Please enter a title'}
            </p>
            <label htmlFor="user">
              User:
            </label>
            {' '}
            <select
              id="user"
              name="userId"
              value={userId}
              onChange={this.handleChangeName}
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
            {' '}
            <label htmlFor="title">
              Title:
            </label>
            {' '}
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Enter the title"
              value={title}
              onChange={this.handleChangeTitle}
            />
            <button
              type="submit"
              className="add"
            >
              Add
            </button>
          </div>
        </form>
        <TodoList activities={todos} />
      </div>
    );
  }
}

export default App;
