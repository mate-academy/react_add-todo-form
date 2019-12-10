import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NewTodo extends Component {
  state = {
    userId: 0,
    title: '',
    isEmptyUser: false,
    isEmptyTitle: false,
    selectValue: '',
  };

  setTitle = (event) => {
    const title = event.target.value.replace(/[^\w?\s]/, '').slice(0, 37);

    this.setState({
      title,
      isEmptyTitle: false,
    });
  }

  setUserId = (event) => {
    const parts = event.target.value.split('.');
    const id = parts[0];

    this.setState({
      userId: +id,
      isEmptyUser: false,
      selectValue: parts.join('.'),
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState(({ userId, title }) => {
      if (!title && !userId) {
        return { isEmptyTitle: true, isEmptyUser: true };
      }

      if (!title) {
        return { isEmptyTitle: true };
      }

      if (!userId) {
        return { isEmptyUser: true };
      }

      this.props.addTodo({
        userId,
        title,
        completed: false,
      });

      return {
        title: '',
        selectValue: 'Choose a user',
        userId: 0,
      };
    });
  }

  render = () => {
    const { users } = this.props;
    const {
      userId,
      selectValue,
      title,
      isEmptyUser,
      isEmptyTitle,
    } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <div className="form__input-wrapper">
          {isEmptyTitle
            ? (
              <span className="form__error">Please enter the title</span>
            ) : ''}

          <input
            className="form__input"
            type="text"
            placeholder="Add New Todo"
            onChange={this.setTitle}
            value={title}
          />
        </div>

        <div className="form__select-wrapper">
          {isEmptyUser
            ? (
              <span
                className="form__error"
                emptyUser={userId}
              >
                Please choose a user
              </span>
            ) : ''}

          <select
            id="selectUser"
            className="form__select"
            onChange={this.setUserId}
            value={selectValue}
          >
            <option>Choose a user</option>
            {users.map(({ name, id }) => (
              <option key={id}>{`${id}. ${name}`}</option>
            ))}
          </select>
        </div>

        <button
          className="form__button"
          type="submit"
        >
          Add
        </button>
      </form>
    );
  };
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
    })
  ).isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default NewTodo;
