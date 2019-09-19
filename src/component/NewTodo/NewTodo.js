import React from 'react';

import PropTypes from 'prop-types';

import './NewTodo.css';

const primaryState = {
  selectedUserId: 'Choose a user',
  newTodoText: '',
  errorNewTodoUser: 0,
  errorNewTodoTitle: '',
};

class NewTodo extends React.Component {
  state = primaryState;

  setNewTodo = (event) => {
    event.preventDefault();

    const { addTodo } = this.props;
    const todoValue = this.getTodoValue();

    addTodo(...todoValue);

    this.setState({
      ...primaryState,
    });
  }

  getTodoValue() {
    const { selectedUserId, newTodoText } = this.state;

    return [{
      userId: selectedUserId,
      title: newTodoText,
      completed: false,
    }];
  }

  giveError = (event) => {
    event.preventDefault();

    this.setState(({ selectedUserId, newTodoText }) => ({
      errorNewTodoUser: selectedUserId === 'Choose a user'
        ? 'Please choose a user'
        : '',
      errorNewTodoTitle: newTodoText === ''
        ? 'Please enter the title'
        : '',
    }));
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState(prevState => ({
      [name]: value.replace(/[^ \w]+/g, ''),
    }));
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
        onSubmit={
          selectedUserId === 'Choose a user'
          || newTodoText === ''
            ? this.giveError
            : this.setNewTodo
        }
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
          {errorNewTodoTitle === 'Please enter the title'
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
        {errorNewTodoUser === 'Please choose a user'
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
