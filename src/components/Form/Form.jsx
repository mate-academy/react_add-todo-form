import React from 'react';
import { FormShape } from '../../shapes/FormShape';

export class Form extends React.PureComponent {
  state = {
    username: '',
    title: '',
    usernameError: false,
    titleError: false,
  }

  onChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      [`${name}Error`]: false,
    });
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { title, username } = this.state;

    if (!title.trim()) {
      this.setState({
        titleError: true,
      });

      return;
    }

    if (!username) {
      this.setState({
        usernameError: true,
      });

      return;
    }

    this.props.addTodo(title, username);

    this.setState({
      title: '',
      username: '',
    });
  }

  render() {
    const { title, username, titleError } = this.state;

    return (
      <form
        className="ui form inverted grey segment"
        onSubmit={this.onSubmit}
      >
        <div className="field">
          <label htmlFor="title">
            Task title:
          </label>

          <input
            type="text"
            name="title"
            id="title"
            placeholder="Letters, numbers and spaces only"
            value={title}
            onChange={this.onChange}
          />

          {titleError && (
            <p className="ui red pointing basic label">
              Please enter the title
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="username">
            User name:
          </label>

          <select
            name="username"
            id="username"
            value={username}
            onChange={this.onChange}
          >
            <option value="">
              Choose a user
            </option>
            {this.props.users.map(user => (
              <option
                key={user.id}
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>

          {this.state.usernameError && (
            <p className="ui red pointing basic label">
              Please choose a user
            </p>
          )}
        </div>

        <button
          type="submit"
          className="ui large green button"
        >
          Add task
        </button>
      </form>
    );
  }
}

Form.propTypes = FormShape;
