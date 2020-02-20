import React from 'react';
import PropTypes from 'prop-types';

import './NewTodo.css';

export class NewTodo extends React.Component {
  state = {
    users: this.props.users,
    title: '',
    userId: 0,
    id: 3,
    errors: false,
  }

  selectedUserId = (event) => {
    const userId = Number(event.target.value);

    this.setState({
      userId,
    });
  }

  handleChange = (event) => {
    const regExp = /^\s/;
    const title = event.target.value.replace(regExp, '');

    if (title.length < 50) {
      this.setState({
        title,
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { id, title, userId } = this.state;

    if (title.length > 0 && userId > 0) {
      const newTodo = {
        id,
        userId,
        title,
        completed: false,
      };

      this.props.addTodo(newTodo);

      this.setState(prevState => ({
        title: '',
        userId: 0,
        id: prevState.id + 1,
        errors: false,
      }));
    } else {
      this.setState({
        errors: true,
      });
    }
  }

  render() {
    const { title, users, userId, errors } = this.state;

    return (
      <>
        <form onSubmit={this.handleSubmit} className="form">
          <label htmlFor="search-query" className="form__label">
            Task
          </label>
          <input
            onChange={this.handleChange}
            type="text"
            id="search-query"
            className="form__taskText"
            value={title}
            placeholder="Type task"
          />
          <div className="selectSubmitWrapper">
            <select
              value={userId}
              onChange={this.selectedUserId}
              className="form__select"
            >
              <option disabled value={0}>Choose a user</option>
              {users.map(user => (
                <option key={user.username} value={user.id}>{user.name}</option>
              ))}
            </select>
            <button
              type="submit"
              className="form__button"
            >
              Add
            </button>
          </div>
          <div className={!errors ? 'errors_hidden' : 'errors'}>
            <div className={
              userId !== 0 ? 'errors__user-hidden' : 'errors__user'
            }
            >
              Please choose a user
            </div>
            <div className={
              title.length !== 0 ? 'errors__user-hidden' : 'errors__title'
            }
            >
              Please enter the title
            </div>
          </div>
        </form>
      </>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  addTodo: PropTypes.func.isRequired,
};
