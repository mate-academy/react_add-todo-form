import React from 'react';
import PropTypes from 'prop-types';
import './AddToDoForm.css';

import users from '../../api/users';

export class AddToDoForm extends React.Component {
  state = {
    title: '',
    userId: 0,
    titleError: false,
    userError: false,
  }

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
      titleError: false,
    });
  };

  handleUserChange = (event) => {
    this.setState({
      userId: +event.target.value,
      userError: false,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    this.setState(state => ({
      titleError: state.title.trim().length === 0,
      userError: !state.userId,
    }));

    const { title, userId } = this.state;

    if (title.trim().length === 0) {
      return;
    }

    if (!userId) {
      return;
    }

    this.props.onAdd(title, userId);

    this.setState({
      title: '',
      userId: 0,
    })
  };

  render() {
    const { title, userId, titleError, userError } = this.state;
    
    return (
      <form
        action=""
        className="form"
        onSubmit={this.handleFormSubmit}
      >
        <div className="form__input-wrapper">
          <label htmlFor="title">
            Title of a new Todo
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter a title"
            value={title}
            onChange={this.handleTitleChange}
          />
          {titleError && (
              <span className="form__error">
                Please enter a title
              </span>
            )}
        </div>

        <div className="form__input-wrapper">
            <label className="form__label" htmlFor="usersList">
              Users list
            </label>

            <select
              id="usersList"
              name="user"
              value={userId}
              onChange={this.handleUserChange}
            >
              <option>
                Choose a user
              </option>

              {users.map(({ id, name }) => (
                <option
                  key={id}
                  value={id}
                >
                  {name}
                </option>
              ))}
            </select>
            {userError && (
              <span className="form__error">
                Please choose a user
              </span>
            )}
          </div>

          <button type="submit">
            Add ToDo
          </button>
      </form>
    )
  }
};

AddToDoForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
