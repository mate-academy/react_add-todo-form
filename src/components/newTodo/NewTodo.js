import React from 'react';

import PropTypes from 'prop-types';
import './newTodo.css';

class NewTodo extends React.Component {
  state = {
    userId: 0,
    title: '',
    inputErrorMessage: false,
    selectErrorMessage: false,
  };

  handleNewTaskName = (event) => {
    this.setState({
      title: event.target.value,
      inputErrorMessage: false,
    });
  }

  handleSelect = (event) => {
    this.setState({
      userId: Number(event.target.value),
      selectErrorMessage: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, userId } = this.state;
    let error = false;

    this.setState({
      userId: Number(event.target.value),
      selectErrorMessage: false,
    });

    const { users } = this.props;

    if (!title) {
      error = true;
      this.setState({
        inputErrorMessage: true,
        userId: 0,
      });
    }

    if (!userId) {
      error = true;
      this.setState({
        selectErrorMessage: true,
        userId: 0,
      });
    }

    if (!error) {
      const { tasks } = this.props;

      this.setState({
        title: '',
        userId: 0,
      });

      this.props.addTask({
        id: tasks[tasks.length - 1].id + 1,
        userId,
        user: users.find(user => user.id === userId),
        title,
      });
    }
  }

  render() {
    const { users } = this.props;
    const { title, userId, inputErrorMessage, selectErrorMessage } = this.state;

    return (
      <form
        name="addTask"
        className="form"
        onSubmit={this.handleSubmit}
      >
        <div className="form__input-container form__child">
          <input
            type="text"
            name="taskName"
            className="form__input"
            placeholder="Input task title"
            value={title}
            onChange={this.handleNewTaskName}
          />
          {inputErrorMessage
          && (
            <span className="error error__input">
            Please, enter task title
            </span>
          )}
        </div>
        <div className="form__select-container form__child">
          <select
            name="selectUser"
            className="form__select"
            value={userId}
            onChange={this.handleSelect}
          >
            <option disabled value={0}>Choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          {selectErrorMessage
          && (
            <span className="error error__select">
            Please, choose a user
            </span>
          )}
        </div>
        <button type="submit" className="form__child form__btn">Add</button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape(),
  ).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  addTask: PropTypes.func.isRequired,
};

export default NewTodo;
