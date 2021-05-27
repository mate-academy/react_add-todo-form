import React from 'react';
import PropTypes from 'prop-types';
import { UserType } from '../../types';
import './AddTodoForm.scss';

export class AddTodoForm extends React.Component {
  state = {
    userId: 0,
    title: '',
    isUserIdError: false,
    isTitleError: false,
  }

  handleUserChange = (event) => {
    this.setState({
      userId: +event.target.value,
      isUserIdError: false,
    });
  }

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
      isTitleError: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState(state => ({
      isUserIdError: !state.userId,
      isTitleError: !state.title,
    }));

    const { userId, title } = this.state;

    if (!userId) {
      return;
    }

    if (!title) {
      return;
    }

    this.props.onAdd(userId, title);
    this.clearState();
  }

  clearState() {
    this.setState({
      userId: 0,
      title: '',
    });
  }

  render() {
    const { userId, title, isUserIdError, isTitleError } = this.state;
    const { users } = this.props;

    return (
      <form
        onSubmit={this.handleSubmit}
      >
        <fieldset className="form">
          <legend>Create a new task:</legend>
          <div>
            <select
              name={userId}
              value={userId}
              onChange={this.handleUserChange}
            >
              <option value="">
                Select user
              </option>
              {users.map(({ id, name }) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
            {isUserIdError && (
              <span className="error">Please choose a user</span>
            )}
          </div>
          <div>
            <label htmlFor="title">Title for task: </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={this.handleTitleChange}
            />
            {isTitleError && (
              <span className="error">Please enter the title</span>
            )}
          </div>
          <button type="submit" className="btn">Create a task</button>
        </fieldset>
      </form>
    );
  }
}

AddTodoForm.propTypes = {
  users: PropTypes.arrayOf(UserType).isRequired,
  onAdd: PropTypes.func.isRequired,
};
