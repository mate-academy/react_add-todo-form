import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import './NewTodo.css';

class NewTodo extends React.Component {
  state = {
    title: '',
    userId: 0,
    isErrorMessage: false,
    isErrorSelect: false,
  }

  selectHandler = ({ target }) => {
    const { value } = target;

    this.setState({
      userId: Number(value),
      isErrorSelect: false,
    });
  }

  inputTextHandler = ({ target }) => {
    const { value } = target;

    this.setState({
      title: value,
      isErrorMessage: false,
    });
  }

  submitHandler = (e) => {
    e.preventDefault();
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
      <form onSubmit={this.submitHandler} className="form">
        <label htmlFor="todo">
            Todo:
          <input
            type="text"
            name="todo"
            id="todo"
            placeholder="Your Task"
            onChange={this.inputTextHandler}
            value={title}
            className="form__input"
          />
        </label>
        {isErrorMessage
            && (
              <div className="form__error">
                Enter Your Task
              </div>
            )}

        <label htmlFor="user">
          User:
          <select
            value={userId}
            onChange={this.selectHandler}
            className="form__input"
            id="user"
          >
            <option value={0} disabled>Choose User</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
        {isErrorSelect
          && (
            <span className="form__error">
              Choose User
            </span>
          )}

        <button className="form__button" type="submit">Add</button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default NewTodo;
