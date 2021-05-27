import React from 'react';
import PropTypes from 'prop-types';
import './AddTodoForm.css';

export class AddTodoForm extends React.Component {
  state = {
    users: this.props.users,
    todoTitle: '',
    todoUser: '',
    hasTitleError: false,
    hasUserError: false,
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    const error = name === 'todoTitle' ? 'hasTitleError' : 'hasUserError';

    this.setState({
      [name]: value,
      [error]: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState(state => ({
      hasTitleError: !state.todoTitle,
      hasUserError: !state.todoUser,
    }));

    const { todoTitle, todoUser } = this.state;

    if (!todoTitle || !todoUser) {
      return;
    }

    this.props.addNewTodo(todoTitle, todoUser);

    this.setState({
      todoTitle: '',
      todoUser: '',
    });
  }

  render() {
    const {
      users,
      todoTitle,
      todoUser,
      hasTitleError,
      hasUserError,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="AddTodoForm">
        <div className="AddTodoForm__input-wrap">
          <input
            name="todoTitle"
            placeholder="Enter new todo item"
            onChange={this.handleChange}
            value={todoTitle}
          />
          {hasTitleError && (
            <span className="error">Please enter the title</span>
          )}
        </div>

        <div className="AddTodoForm__input-wrap">
          <select
            name="todoUser"
            onChange={this.handleChange}
            value={todoUser}
          >
            <option disabled value="">Choose a user</option>
            {users.map(({ id, name }) => (
              <option key={id}>{name}</option>
            ))}
          </select>
          {hasUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          className="AddTodoForm__button"
        >
          Add todo item
        </button>
      </form>
    );
  }
}

AddTodoForm.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
};
