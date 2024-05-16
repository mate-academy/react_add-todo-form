import React from 'react';
import PropTypes from 'prop-types';
import { UserPropTypes } from '../../PropTypes/UserPropTypes';
import './form.scss';

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
        className="form"
      >
        <div className="form__title">
          <label>
            <p>Enter title:</p>
            <input
              type="text"
              placeholder="(Only spaces, letters and number)"
              className="form__input"
              name="title"
              value={title}
              onChange={this.handleChange}
            />
          </label>

          {titleError
            && <p className="form__error">Please enter the title</p>}
        </div>

        <div className="form__user">
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
            && <p className="form__error">Please choose a user</p>}
        </div>

        <button
          type="submit"
          className="form__button"
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
