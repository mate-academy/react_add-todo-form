import React from 'react';
import PropTypes from 'prop-types';

import './TodoForm.css';

export class TodoForm extends React.Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
    addTodo: PropTypes.func.isRequired,
    nextId: PropTypes.number.isRequired,
  };

  state = {
    todo: '',
    user: '',
    isTodoValid: true,
    isUserValid: true,
  };

  submitForm = (event) => {
    event.preventDefault();

    const { users, addTodo, nextId } = this.props;
    const { todo, user } = this.state;
    let isValidated = true;

    if (todo === '' || todo === ' ') {
      this.setState({
        isTodoValid: false,
      });

      isValidated = false;
    }

    if (user === 'Choose a user' || user === '') {
      this.setState({
        isUserValid: false,
      });

      isValidated = false;
    }

    if (isValidated) {
      this.setState({
        todo: '',
        user: '',
      });

      addTodo({
        user: users.find(person => person.name === user),
        userId: users.find(person => person.name === user).id,
        id: nextId,
        title: todo,
        completed: false,
      });
    }
  };

  render() {
    const { users } = this.props;
    const { todo, user, isTodoValid, isUserValid } = this.state;

    return (
      <form action="#" className="todo__form">
        <div>
          <label htmlFor="todo">Input a todo: </label>
          <input
            type="text"
            id="todo"
            className="todo__form-input"
            placeholder="Enter a todo"
            value={todo}
            onChange={(event) => {
              this.setState({
                todo: event.target.value,
                isTodoValid: true,
              });
            }}
            autoComplete="off"
          />
          {!isTodoValid && (
            <span className="todo__form-error todo__form-error--todo">
              Please enter the title
            </span>
          )}
        </div>
        <div>
          <label htmlFor="user">Select a user: </label>
          <select
            name="users"
            id="user"
            className="todo__form-select"
            value={user}
            onChange={(event) => {
              this.setState({
                user: event.target.value,
                isUserValid: true,
              });
            }}
          >
            <option>Choose a user</option>
            {users.map(person => (
              <option key={person.id}>{person.name}</option>
            ))}
          </select>
          {!isUserValid && (
            <span className="todo__form-error todo__form-error--user">
              Please choose a user
            </span>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="todo__form-submit"
            onClick={this.submitForm}
          >
            Add todo
          </button>
        </div>
      </form>
    );
  }
}
