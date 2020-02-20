import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import './NewTaskCreator.css';

export class NewTaskCreator extends React.Component {
  state = {
    title: '',
    userId: 0,
    isErrorMessage: false,
    isErrorSelect: false,
  }

  handleSelectChange = ({ target }) => {
    const { value } = target;

    this.setState({
      userId: Number(value),
      isErrorSelect: false,
    });
  }

  handleInputChange = ({ target }) => {
    const { value } = target;

    this.setState({
      title: value,
      isErrorMessage: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, userId } = this.state;
    let isError = false;

    if (this.state.title.trim() === '') {
      isError = true;

      this.setState({
        isErrorMessage: true,
      });
    }

    if (userId === 0) {
      isError = true;

      this.setState({
        isErrorSelect: true,
      });
    }

    if (!isError) {
      const { users } = this.props;

      this.props.addTodo({
        id: uuid(),
        user: users.find(user => user.id === userId),
        title,
      });

      this.setState({
        title: '',
        userId: 0,
      });
    }
  }

  render() {
    const { users } = this.props;
    const { title, userId, isErrorMessage, isErrorSelect } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="task-input">
          <h3>Add your task:</h3>
          <input
            name="todo"
            id="task-input"
            type="text"
            placeholder="input task here"
            className="input"
            onChange={this.handleInputChange}
            value={title}
          />
        </label>
        {isErrorMessage
        && (
          <span className="input__error">
            Add your task above
          </span>
        )}
        <select
          className="select"
          value={userId}
          onChange={this.handleSelectChange}
        >
          <option value={0} disabled>Choose User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        {isErrorSelect
          && (
            <span className="select__error">
              Choose user above
            </span>
          )}
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

NewTaskCreator.propTypes = {
  addTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
