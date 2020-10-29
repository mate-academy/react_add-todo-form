import React from 'react';
import { FormShape } from '../shapes/FormShape';

export class Form extends React.PureComponent {
  state = {
    title: '',
    username: '',
    titleError: false,
    usernameError: false,
  }

  onChange = (target) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
      [`${name}Error`]: false,
    });
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { title, username } = this.state;

    if (title === '') {
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

    this.props.addTodo(title, username);

    this.setState({
      title: '',
      username: '',
    });
  }

  render() {
    const { title, username } = this.state;

    return (
      <form
        className="ui form orange segment"
        onSubmit={event => (
          this.onSubmit(event)
        )}
      >
        <div className="field">
          <label htmlFor="title">
            Title:
          </label>

          <input
            type="text"
            name="title"
            id="title"
            placeholder="Letters, numbers and spaces only"
            value={title}
            onChange={event => (
              this.onChange(event.target)
            )}
          />

          {this.state.titleError && (
            <p className="ui red pointing basic label">
              Please enter the title
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="username">
            User:
          </label>

          <select
            className="ui selection dropdown"
            name="username"
            id="username"
            value={username}
            onChange={event => (
              this.onChange(event.target)
            )}
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
          className="ui large orange button fluid"
        >
          Add
        </button>
      </form>
    );
  }
}

Form.propTypes = FormShape;
