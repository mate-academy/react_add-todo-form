import React from 'react';

import PropTypes from 'prop-types';
import './NewTodo.css';

class NewTodo extends React.Component {
  state = {
    selectedUserId: 'Choose a user',
    newTodoText: '',
    errorNewTodoUser: '',
    errorNewTodoTitle: '',
  }

  getTodoValue() {
    const { selectedUserId, newTodoText } = this.state;

    return [{
      userId: selectedUserId,
      title: newTodoText,
      completed: false,
    }];
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { selectedUserId, newTodoText } = this.state;
    const { addTodo } = this.props;
    const todoValue = this.getTodoValue();

    if (selectedUserId === 'Choose a user'
    || newTodoText === '') {
      return this.setState({
        errorNewTodoUser: selectedUserId === 'Choose a user'
          ? 'Please choose a user'
          : '',
        errorNewTodoTitle: newTodoText === ''
          ? 'Please enter the title'
          : '',
      });
    }

    addTodo(...todoValue);

    this.setState({
      selectedUserId: 'Choose a user',
      newTodoText: '',
      errorNewTodoUser: '',
      errorNewTodoTitle: '',
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value.replace(/[^ \w]+/g, ''),
    });
  }

  render() {
    const {
      selectedUserId,
      newTodoText,
      errorNewTodoUser,
      errorNewTodoTitle,
    } = this.state;

    const { users } = this.props;

    return (
      <form
        className="newtodo-form"
        onSubmit={this.handleSubmit}
      >
        <label>
          <p className="newtodo-title">ToDo:</p>
          <input
            name="newTodoText"
            className="newtodo-text"
            maxLength="50"
            placeholder="Enter ToDo"
            type="text"
            value={newTodoText}
            onChange={this.handleChange}
          />
          {errorNewTodoTitle
          && (
            <p className="newtodo-error newtodo-error_title">
              {errorNewTodoTitle}
            </p>
          )}

        </label>
        <select
          name="selectedUserId"
          className="newtodo-user"
          value={selectedUserId}
          onChange={this.handleChange}
        >
          <option value={0}>Choose a user</option>
          {
            users.map((user, index) => (
              <option key={user.id} value={index + 1}>{user.name}</option>
            ))
          }
        </select>
        {errorNewTodoUser
          && (
            <p className="newtodo-error newtodo-error_user">
              {errorNewTodoUser}
            </p>
          )}

        <button
          className="newtodo-add"
          type="submit"
        >
          Add
        </button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
};

export default NewTodo;
