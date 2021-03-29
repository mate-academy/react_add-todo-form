import React from 'react';
import PropTypes from 'prop-types';

import users from '../../api/users';

export class Form extends React.Component {
  state = {
    userId: 0,
    toDoTitle: '',
    errorName: false,
    errorTitle: false,
    completed: false,
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.state.userId && !this.state.toDoTitle) {
      return this.setState({
        errorTitle: true,
        errorName: true,
      });
    }

    if (!this.state.userId) {
      return this.setState({ errorName: true });
    }

    if (!this.state.toDoTitle) {
      return this.setState({ errorTitle: true });
    }

    return (
      this.setState((currentState) => {
        const newToDo = {
          userId: currentState.userId,
          id: this.props.toDoList.length + 1,
          title: currentState.toDoTitle,
          completed: currentState.completed,
          user: users.find(user => user.id === +this.state.userId),
        };

        this.props.onAdd(newToDo);

        return ({
          userId: 0,
          toDoTitle: '',
          errorName: false,
          errorTitle: false,
          completed: false,
        });
      })
    );
  }

  changeName = (event) => {
    const { value } = event.target;

    this.setState({
      userId: value,
      errorName: false,
    });
  }

  changeTitle = (event) => {
    const { value } = event.target;

    this.setState({ toDoTitle: value });
  }

  render() {
    const { errorName, errorTitle, toDoTitle, userId } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        {errorName && <p className="error">Choose a user</p>}

        <span>Choose user </span>
        <select
          name="user"
          value={userId}
          onChange={this.changeName}
        >
          <option value="">
            Choose a user
          </option>
          {
            users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))
          }
        </select>

        {errorTitle && <p className="error">Please enter the title</p>}

        <label htmlFor="title">
          {` Choose title `}
        </label>
        <input
          type="text"
          id="title"
          placeholder={errorTitle && 'Enter the title here'}
          value={toDoTitle}
          onChange={this.changeTitle}
        />

        <button
          type="submit"
        >
          Add
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  onAdd: PropTypes.func.isRequired,
  toDoList: PropTypes.arrayOf(
    PropTypes.shape(),
  ).isRequired,
};
