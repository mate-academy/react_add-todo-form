import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import './NewTodo.css';

export class NewTodo extends React.Component {
  state = {
    value: '',
    userId: 0,
    isTextError: false,
    isSelectError: false,
  }

  changeHandler = (event) => {
    this.setState({
      value: event.target.value,
      isTextError: false,
    });
  }

  onSelect = (event) => {
    this.setState({
      userId: event.target.value,
      isSelectError: false,
    });
  }

  onSubmit = (event) => {
    const { value, userId } = this.state;
    let canAddTask = true;

    event.preventDefault();

    if (userId === 0) {
      this.setState({ isSelectError: true });
      canAddTask = false;
    }

    if (!/^[^\s][\w\s]{1,18}$/gi.test(value)) {
      this.setState({ isTextError: true });
      canAddTask = false;
    }

    if (canAddTask) {
      this.props.addTask({
        userId: Number(userId),
        id: uuid(),
        title: value.trimRight(),
        completed: false,
      });

      this.setState({
        value: '',
        userId: 0,
      });
    }
  }

  render() {
    const { users } = this.props;
    const { value, userId, isTextError, isSelectError } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <div className="input-container">
          <input
            type="text"
            value={value}
            placeholder="Enter 2 < characters < 20"
            className="input"
            onChange={this.changeHandler}
          />
          {isTextError
            && <span className="error">Please enter the correct title</span>}
        </div>
        <div className="input-container">
          <select
            value={userId}
            onChange={this.onSelect}
            className="input"
          >
            <option value={0} disabled>Choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {isSelectError
          && <span className="error">Please choose a user</span>}
        </div>
        <button
          className="button"
          type="submit"
        >
          Add
        </button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  addTask: PropTypes.func.isRequired,
};
