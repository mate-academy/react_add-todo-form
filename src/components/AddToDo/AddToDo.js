import React from 'react';
import PropTypes from 'prop-types';
import { UserPropTypes } from '../PropTypes/UserPropTypes';
import './AddToDo.css';

export class AddToDo extends React.PureComponent {
  state = {
    title: '',
    userName: '',
    titleError: false,
    userNameError: false,
  }

  handleChange = (event) => {
    const { name, value, type } = event.target;

    this.setState({
      [name]: type === 'text'
        ? value.replace(/[^\w ]+/, '')
        : value,
      [`${name}Error`]: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, userName } = this.state;
    const { addToDo, users } = this.props;
    const titleError = !title.trim();
    const userNameError = !userName;

    if (userNameError || titleError) {
      this.setState({
        titleError,
        userNameError,
      });

      return;
    }

    const selectedUser = users.find(user => user.name === userName);

    addToDo(title, selectedUser);

    this.setState({
      title: '',
      userName: '',
      titleError: false,
      userNameError: false,
    });
  }

  render() {
    const { users } = this.props;
    const {
      title,
      userName,
      titleError,
      userNameError,
    } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        className="ui form"
      >
        <p className="title">Enter title:</p>
        <label className="form__input">
          <input
            type="text"
            placeholder="Only letters, number and spaces"
            className="ui input"
            name="title"
            value={title}
            onChange={this.handleChange}
          />

          {titleError
              && <p className="ui red pointing basic label">Enter the title</p>
          }
        </label>

        <label className="form__input">
          <select
            name="userName"
            value={userName}
            onChange={this.handleChange}
          >
            <option
              value=""
            >
              Choose name
            </option>
            {
              users.map(user => (
                <option value={user.name} key={user.id}>
                  {user.name}
                </option>
              ))
            }
          </select>

          {userNameError
          && <p className="ui red pointing basic label">Please choose a user</p>
          }
        </label>

        <button
          type="submit"
          className="ui button blue"
        >
          Add todo!
        </button>
      </form>
    );
  }
}

AddToDo.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape(UserPropTypes).isRequired,
  ).isRequired,
  addToDo: PropTypes.func.isRequired,
};
