import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NewTodo extends Component {
  state = {
    userId: 0,
    title: '',
    isEmptyUser: false,
    isEmptyTitle: false,
  };

  setTitle = (event) => {
    const title = event.target.value
      .replace(/[^A-Za-zА-Яа-яі\s]/, '')
      .slice(0, 37);

    this.setState({
      title,
      isEmptyTitle: false,
    });
  }

  setUserId = (event) => {
    this.setState({
      userId: +event.target.value,
      isEmptyUser: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState(({ userId, title }) => {
      const errors = {};

      errors.isEmptyTitle = title.trim() === '';
      errors.isEmptyUser = userId === 0;

      if (!errors.isEmptyTitle && !errors.isEmptyUser) {
        this.props.addTodo({
          userId,
          title,
          completed: false,
        });

        return {
          title: '',
          userId: 0,
        };
      }

      return errors;
    });
  }

  render = () => {
    const { users } = this.props;
    const { userId, title, isEmptyUser, isEmptyTitle } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <div className="form__input-wrapper">
          {isEmptyTitle && (
            <span className="form__error">Please enter the title</span>
          )}

          <input
            className="form__input"
            type="text"
            placeholder="Add New Todo"
            onChange={this.setTitle}
            value={title}
          />
        </div>

        <div className="form__select-wrapper">
          {isEmptyUser && (
            <span className="form__error">Please choose a user</span>
          )}

          <select
            id="selectUser"
            className="form__select"
            onChange={this.setUserId}
            value={userId}
          >
            <option value={0}>Choose a user</option>
            {users.map(({ name, id }) => (
              <option
                key={id}
                value={id}
              >
                {`${id}. ${name}`}
              </option>
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
