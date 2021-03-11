import React from 'react';
import PropTypes from 'prop-types';
import './TodoForm.css';

export class TodoForm extends React.Component {
  state = {
    title: '',
    username: '',
    maxlength: 30,
    charsLeft: 30,
    completed: false,
    isTitleError: false,
    isUsernameError: false,
  }

  handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const { maxlength } = this.state;

    event.persist();

    const newValue = type === 'text' ? value.replace(/^\s/g, '') : value;

    this.setState(state => ({
      [name]: type === 'checkbox' ? checked : newValue,
      charsLeft: type === 'text'
        ? maxlength - newValue.length
        : state.charsLeft,
      isTitleError: false,
      isUsernameError: false,
    }));
  }

  addNewTodo = (event) => {
    const { addTodo, newTodoId } = this.props;
    const { title, username, completed, maxlength } = this.state;

    event.preventDefault();

    this.validationForm();

    if (title && username) {
      this.setState({
        title: '',
        username: '',
        completed: false,
        charsLeft: maxlength,
      });

      const newTodo = {
        id: newTodoId,
        title,
        completed,
        user: {
          name: username,
        },
      };

      addTodo(newTodo);
    }
  }

  validationForm() {
    const { title, username } = this.state;

    if (!title.trim()) {
      this.setState(state => ({ isTitleError: !state.isTitleError }));
    }

    if (!username) {
      this.setState(state => ({ isUsernameError: !state.isUsernameError }));
    }
  }

  render() {
    const { users } = this.props;
    const {
      title,
      username,
      isTitleError,
      isUsernameError,
      completed,
      charsLeft,
      maxlength,
    } = this.state;

    return (
      <div className="TodoForm">
        <form onSubmit={this.addNewTodo}>
          <div>
            <select
              name="username"
              value={username}
              onChange={this.handleChange}
            >
              <option
                value=""
              >
                Please chose user
              </option>
              {users.map(user => (
                <option
                  key={user.id}
                  value={user.name}
                >
                  {user.name}
                </option>
              ))}
            </select>
            {isUsernameError && (
              <div className="error">
                Please choose a user
              </div>
            )}
          </div>
          <div>
            <input
              type="text"
              name="title"
              maxLength={maxlength}
              value={title}
              placeholder="Please enter a title"
              onChange={this.handleChange}
            />
            <p>
              Characters Left:
              {' '}
              { charsLeft }
            </p>
            {isTitleError && (
              <div className="error">
                Please enter the title
              </div>
            )}
          </div>
          <div>
            <input
              type="checkbox"
              name="completed"
              id="completed"
              checked={completed}
              onChange={this.handleChange}
            />
            <label htmlFor="completed">
              Completed todo
            </label>
          </div>
          <button
            className="add"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
  newTodoId: PropTypes.number.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
