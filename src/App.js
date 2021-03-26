import React from 'react';
import './App.css';

import { TodoList } from './components/TodoList';

import users from './api/users';
import todos from './api/todos';

const preparedActivities = todos.map(activity => ({
  ...activity,
  user: users.find(user => user.id === activity.userId),
}));

class App extends React.Component {
  state = {
    activitiesList: preparedActivities,
    userId: null,
    title: '',
    noUserFlag: false,
    noTitleFlag: false,
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.state.userId) {
      this.setState({
        noUserFlag: true,
      });

      return;
    }

    if (!this.state.title) {
      this.setState({
        noTitleFlag: true,
      });

      return;
    }

    this.setState(prevState => ({
      activitiesList: [...prevState.activitiesList, {
        id: prevState.activitiesList.length + 1,
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

  handleChange = (event) => {
    const {
      name, value,
    } = event.target;

    this.setState({
      [name]: value,
      noUserFlag: false,
      noTitleFlag: false,
    });
  };

  render() {
    const {
      activitiesList,
      userId,
      title,
      noUserFlag,
      noTitleFlag,
    } = this.state;

    return (
      <div className="form">
        <form onSubmit={!noUserFlag
          && !noTitleFlag
          && this.handleSubmit}
        >
          <div className="activities">
            <p className="error">
              {noUserFlag && 'Please choose a user'}
            </p>
            <label htmlFor="user">
              User:
            </label>
            {' '}
            <select
              id="user"
              name="userId"
              value={userId}
              onChange={this.handleChange}
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
              onChange={this.handleChange}
            />
            <p className="error">
              {this.state.noTitleFlag && 'Please enter a title'}
            </p>
            <button
              type="submit"
              className="add"
            >
              Add
            </button>
          </div>
        </form>
        <TodoList activities={activitiesList} />
      </div>
    );
  }
}

export default App;
