import React from 'react';
import PropTypes from 'prop-types';
import usersFromServer from '../../api/users';

export class Form extends React.Component {
  state = {
    newTodoTitle: '',
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
      newTodoTitle: value,
      hasTodoError: false,
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { newTodoTitle, selectedUserId } = this.state;

    if (!newTodoTitle || !selectedUserId) {
      this.setState({
        hasUserError: !selectedUserId,
        hasTodoError: !newTodoTitle,
      });

      return;
    }

    this.props.addTodo(newTodoTitle, selectedUserId);

    this.setState({
      newTodoTitle: '',
      selectedUserId: 0,
    });
  }

  render() {
    const { newTodoTitle,
      selectedUserId,
      hasUserError,
      hasTodoError } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.handleFormSubmit}
      >
        <h1>Add todo</h1>
        <div>
          <select
            className="form__select"
            value={selectedUserId}
            onChange={this.handleUserChange}
          >
            <option value="0">Choose user</option>
            {usersFromServer.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
        </div>
        <span
          hidden={!hasUserError}
          className="error"
        >
          Please choose a user
        </span>
        <div>
          <input
            className="form__input"
            placeholder="Enter the task"
            value={newTodoTitle}
            onChange={this.handleTodoChange}
          />
        </div>
        <span
          hidden={!hasTodoError}
          className="error"
        >
          Please enter the title
        </span>
        <div>
          <button
            className="form__button"
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
