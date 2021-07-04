import React from 'react';
import PropTypes from 'prop-types';
import { UserType } from '../typedefs/userType';

class NewTodo extends React.Component {
  state = {
    title: '',
    userId: 0,
    completed: false,
    currentTodoId: this.props.initialTodoId,
    selectError: false,
    inputError: false,
  }

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
      inputError: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { userId, currentTodoId, title, completed } = this.state;

    if (title.trim().length === 0) {
      this.setState({
        title: '',
        inputError: true,
      });

      return;
    }

    if (userId === 0) {
      this.setState({
        selectError: true,
      });

      return;
    }

    const newTodo = {
      userId,
      id: currentTodoId + 1,
      title,
      completed,
      user: this.props.users.find(user => userId === user.id),
    };

    this.props.saveTodo(newTodo);

    this.resetForm();
  }

  handleUserChange = (event) => {
    this.setState({
      userId: +event.target.value,
      selectError: false,
    });
  }

  handleStatusChange = () => {
    this.setState(state => ({
      completed: !state.completed,
    }));
  }

  resetForm = () => {
    this.setState(state => ({
      title: '',
      userId: 0,
      completed: false,
      currentTodoId: state.currentTodoId + 1,
    }));
  }

  render() {
    const { users } = this.props;
    const { title, userId, selectError, inputError, completed } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="todo__form form">
        <label className="form__label">
          Enter title:
          <input
            type="text"
            className="form__input"
            value={title}
            onChange={this.handleTitleChange}
          />
          {inputError
            && <span className="form__error-msg">Please enter the title</span>}
        </label>
        <label className="form__label">
          <select
            onChange={this.handleUserChange}
            value={userId}
          >
            <option value="" hidden>Choose a user</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {selectError
            && <span className="form__error-msg">Choose a user, please</span>}
        </label>
        <label className="form__label">
          Completed
          <input
            type="checkbox"
            className="form__checkbox"
            checked={completed}
            onChange={this.handleStatusChange}
          />
        </label>
        <button type="submit" className="form__button">
          Add
        </button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  initialTodoId: PropTypes.number.isRequired,
  saveTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(UserType).isRequired,
};

export default NewTodo;
