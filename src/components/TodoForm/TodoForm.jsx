import React from 'react';
import PropTypes from 'prop-types';
import './TodoForm.css';

import { SelectOption } from '../SelectOption';

export class TodoForm extends React.PureComponent {
  state = {
    todoTitle: '',
    username: '',
    titleError: false,
    usernameError: false,
  }

  handleChange = (value) => {
    this.setState({
      username: value,
      titleError: false,
      usernameError: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { todoTitle, username } = this.state;

    if (todoTitle === '') {
      this.setState({
        titleError: true,
      });

      return;
    }

    if (username === '') {
      this.setState({
        usernameError: true,
      });

      return;
    }

    this.props.handleTodoList(todoTitle);

    this.setState({
      todoTitle: '',
      username: '',
      titleError: false,
    });
  }

  render() {
    const { users } = this.props;
    const { username,
      todoTitle,
      titleError,
      usernameError } = this.state;

    return (
      <>
        <form
          className="App__form form"
          onSubmit={this.handleSubmit}
        >
          <select
            className="form__select select"
            name="username"
            id="username"
            value={username}
            onChange={(event) => {
              this.handleChange(event.target.value);
            }}
          >
            <SelectOption users={users} />
          </select>

          <input
            className="form__input"
            type="text"
            placeholder="write task here"
            value={todoTitle}
            onChange={(event) => {
              this.setState({
                todoTitle: event.target.value.replace(/[^\w\s]/g, ''),
              });
            }}
          />

          <button
            className="form__submit-button"
            type="submit"
          >
            add
          </button>
        </form>

        {titleError && (
          <p>Please fill a title</p>
        )}

        {usernameError && (
          <p>Please choose a user</p>
        )}
      </>
    );
  }
}

TodoForm.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  handleTodoList: PropTypes.func.isRequired,
};
