import React from 'react';
import PropTypes from 'prop-types';
import usersFromServer from '../../api/users';
import './Form.css'

export class Form extends React.Component {
  state = {
    newTitle: '',
    selectedUserId: 0,
    hasUserError: false,
    hasTodoError: false,
  }

  handleUserChange = (event) => {
    const { value } = event.target;

    this.setState({
      selectedUserId: +value,
      hasUserError: false,
    });
  }

  handleTodoChange = (event) => {
    const { value } = event.target;

    this.setState({
      newTitle: value,
      hasTodoError: false,
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { newTitle, selectedUserId } = this.state;

    if (!newTitle || !selectedUserId) {
      this.setState({
        hasUserError: !selectedUserId,
        hasTodoError: !newTitle,
      });

      return;
    }

    this.props.addTodo(newTitle, selectedUserId);

    this.setState({
      newTitle: '',
      selectedUserId: 0,
    });
  }

  render() {
    const {
      newTitle,
      selectedUserId,
      hasUserError,
      hasTodoError } = this.state;

    return (
      <form
        className="addTodo"
        onSubmit={this.handleFormSubmit}
      >
        <div className="input__wrapper">
          <div className="input__container">
          <select
            className="form-select"
            value={selectedUserId}
            onChange={this.handleUserChange}
          >
            <option value="0">Choose user</option>
            {usersFromServer.map(({ id, name }) => (
              <option
                key={id}
                value={id}
              >
                {name}
              </option>
            ))}
          </select>
          <span
            hidden={!hasUserError}
            className="error"
          >
            Please choose a user
          </span>
        </div>
        <div className="input__container">
          <input
            className="form-control form-control-lg"
            placeholder="Enter the task"
            value={newTitle}
            onChange={this.handleTodoChange}
          />
          <span
            hidden={!hasTodoError}
            className="error"
          >
            Please enter the title
          </span>
          </div>
          <button
            className="btn btn-primary"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  addTodo: PropTypes.func.isRequired,
};