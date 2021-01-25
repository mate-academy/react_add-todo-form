import React from 'react';
import PropTypes from 'prop-types';

import './NewTodoForm.css';

export class NewTodoForm extends React.Component {
  state={
    username: '',
    title: '',
    errors: {
      title: false,
      username: false,
    },
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    const regExp = /[^\w ]+/;

    this.setState(state => ({
      [name]: value.replace(regExp, ''),
      errors: {
        ...state.errors,
        [name]: false,
      },
    }));
  }

  handleSubmit = (event) => {
    const { title, username } = this.state;
    const { onAdd, users } = this.props;

    event.preventDefault();

    if (!title.trim()) {
      this.setState(state => ({
        errors: {
          ...state.errors,
          title: true,
        },
      }));
    }

    if (!username) {
      this.setState(state => ({
        errors: {
          ...state.errors,
          username: true,
        },
      }));
    }

    if (title && username) {
      const foundUser = users.find(user => user.name === username);

      this.setState({
        title: '',
        username: '',
      });

      onAdd(title, foundUser);
    }
  }

  render() {
    const { errors, title, username } = this.state;
    const { users } = this.props;

    return (
      <div className="form">
        <form
          onSubmit={this.handleSubmit}
        >
          <div className="form__input form-group">
            <label htmlFor="username" className="font-weight-bold">
              Username
            </label>
            <select
              name="username"
              id="username"
              className="form-control"
              value={username}
              onChange={this.handleChange}
            >
              <option>Choose a user</option>
              {users.map(user => (
                <option
                  key={user.id}
                  value={user.name}
                >
                  {user.name}
                </option>
              ))}
            </select>

            {errors.username
              && <p className="text-danger">Please, choose a user</p>
            }
          </div>

          <div className="form__input form-group card-title">
            <label htmlFor="newtodo" className="font-weight-bold">
              New todo
            </label>
            <input
              type="text"
              name="title"
              id="newtodo"
              className="form-control"
              placeholder="todo title"
              value={title}
              onChange={this.handleChange}
            />

            {errors.title
              && <p className="text-danger">Please, enter the title</p>
            }
          </div>

          <button
            type="submit"
            className="btn btn-dark w-50"
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}

NewTodoForm.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  onAdd: PropTypes.func.isRequired,
};
