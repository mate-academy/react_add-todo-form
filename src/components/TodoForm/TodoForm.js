import React from 'react';
import PropTypes from 'prop-types';
import { UserType } from '../../types';
import { ErrorMessage } from '../ErrorMessage';

import './TodoForm.css';

export class TodoForm extends React.Component {
  state = {
    title: '',
    isTitleCorrect: true,
    userId: '',
    isUserIdCorrect: true,
  };

  findUser = id => this.props.users.find(user => user.id === id);

  validateForm = (event) => {
    event.preventDefault();

    const { title, userId } = this.state;
    const { addTodo, newTodoId } = this.props;

    let isDataCorrect = true;

    if (title.trim().length === 0) {
      this.setState({ isTitleCorrect: false });
      isDataCorrect = false;
    }

    if (userId.length === 0) {
      this.setState({ isUserIdCorrect: false });
      isDataCorrect = false;
    }

    if (isDataCorrect) {
      addTodo({
        userId: Number(userId),
        id: newTodoId,
        title,
        completed: false,
        user: this.findUser(Number(userId)),
      });

      this.clearForm();
    }
  }

  clearForm = () => {
    this.setState({
      title: '',
      userId: '',
    });
  }

  handleChange = (event) => {
    let { value } = event.target;
    const { name } = event.target;

    if (name === 'title') {
      value = value.replace(/[^A-Za-z0-9 ]/g, '');
    }

    this.setState({
      [name]: value,
      [`is${name[0].toUpperCase() + name.slice(1)}Correct`]: true,
    });
  }

  render() {
    const { users } = this.props;
    const { title, isTitleCorrect, userId, isUserIdCorrect } = this.state;

    return (
      <>
        { !isTitleCorrect && (
          <ErrorMessage
            title="Wrong title"
            message="Please enter the title."
          />
        )}

        { !isUserIdCorrect && (
          <ErrorMessage
            title="Wrong user"
            message="Please choose a user."
          />
        )}

        <form>
          <label htmlFor="title" className="label">
            <span className="label__text">Title:</span>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Your todo"
              value={title}
              onChange={this.handleChange}
              className="input"
            />
          </label>

          <br />

          <label htmlFor="user" className="label">
            <span className="label__text">User:</span>
            <select
              name="userId"
              id="user"
              value={userId}
              onChange={this.handleChange}
              className="input"
            >
              <option
                value=""
              >
                Choose user
              </option>
              {users.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            onClick={this.validateForm}
            className="button"
          >
            Add todo!
          </button>
        </form>
      </>
    );
  }
}

TodoForm.propTypes = {
  newTodoId: PropTypes.number.isRequired,
  users: PropTypes.arrayOf(UserType).isRequired,
  addTodo: PropTypes.func.isRequired,
};
