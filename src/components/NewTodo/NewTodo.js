import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import './NewTodo.css';

export class NewTodo extends Component {
  state = {
    title: '',
    isErrorMessage: false,
    isErrorSelect: false,
    userId: 0,
  }

  handleSelectChange = ({ target: { value } }) => {
    this.setState({
      userId: Number(value),
      isErrorSelect: false,
    });
  }

  handleInputChange = ({ target: { value } }) => {
    this.setState({
      title: value,
      isErrorMessage: false,
    });
  }

  handleSubmitForm = (event) => {
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
        completed: false,
        userId,
      });

      this.setState({
        title: '',
        userId: 0,
      });
    }
  }

  render() {
    const { title, userId, isErrorMessage, isErrorSelect } = this.state;
    const { users } = this.props;

    return (
      <form
        className="form"
        onSubmit={
          this.handleSubmitForm}
      >
        <label>
          <input
            type="text"
            className="form__input form__item"
            onChange={this.handleInputChange}
            value={title}
            placeholder="Enter new todo"
          />
        </label>
        {isErrorMessage && (
          <div className="error">
            Enter Your Task
          </div>
        )}

        <label>
          <select
            className="form__select form__item"
            onChange={this.handleSelectChange}
            value={userId}
          >
            <option value="">Choose user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
        {isErrorSelect
          && (
            <div className="error">
              Choose User
            </div>
          )}

        <button
          className="form__button form__item"
          type="submit"
        >
          Add
        </button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
    }).isRequired,
  ).isRequired,
  addTodo: PropTypes.func.isRequired,
};
