import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AddTodoForm.css';
import { customAlphabet } from 'nanoid/non-secure';

const nanoid = customAlphabet('1234567890', 3);

export class AddTodoForm extends Component {
  state = {
    user: null,
    userId: '',
    title: '',
    hasTitleError: false,
    hasUserError: false,
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { user, title } = this.state;
    const { addTodo } = this.props;

    if (user && title !== '') {
      const newTodo = {
        userId: user.id,
        id: +nanoid(),
        title,
        user,
        completed: false,
        hasTitleError: false,
        hasUserError: false,
      };

      addTodo(newTodo);
    }

    if (title === '') {
      this.setState({ hasTitleError: true });
    }

    if (!user) {
      this.setState({ hasUserError: true });
    }

    if (user && title !== '') {
      this.setState({
        user: null,
        userId: '',
        title: '',
      });
    }
  }

  handleSelection = (event) => {
    const userId = event.target.value;
    const { users } = this.props;

    this.setState(
      {
        user: users.find(user => user.id === +userId),
        userId,
        hasUserError: false,
      },
    );
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });

    if (this.state.title !== '') {
      this.setState({ hasTitleError: false });
    }
  }

  render() {
    const { users } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form__error">
          {this.state.hasTitleError && (
            <div className="form__error__title">
              <h3>
                Error
              </h3>
              <p>
                Please enter the title
              </p>
            </div>
          )}

          {this.state.hasUserError && (
            <div className="form__error__select">
              <h3>
                Error
              </h3>
              <p>
                Please choose a user
              </p>
            </div>
          )}
        </div>

        <div>
          <input
            type="text"
            name="title"
            placeholder="Add title"
            value={this.state.title}
            onChange={this.handleChange}
            pattern="([^\s][A-z0-9À-ž\s]+)"
          />

          <select
            name="user"
            value={this.state.userId}
            onChange={this.handleSelection}
          >
            <option>Select user</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          <button type="submit">Add</button>
        </div>
      </form>
    );
  }
}

AddTodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
