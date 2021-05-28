import React from 'react';
import PropTypes from 'prop-types';
import users from '../../api/users';

export class TodosForm extends React.Component {
  state = {
    newTodoTitle: '',
    newUserId: 0,
    hasTodoTitleError: false,
    hasUserIdError: false,
  }

  handleTodoTitleChange = (event) => {
    this.setState({
      newTodoTitle: event.target.value,
    });
  }

  handleUserIdChange = (event) => {
    this.setState({
      newUserId: +event.target.value,
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { newTodoTitle, newUserId } = this.state;

    this.setState({
      hasTodoTitleError: !newTodoTitle,
      hasUserIdError: !newUserId,
    });

    if (!newTodoTitle) {
      return;
    }

    if (!newUserId) {
      return;
    }

    this.props.onAdd(newTodoTitle, newUserId);
  }

  render() {
    const {
      newTodoTitle,
      newUserId,
      hasTodoTitleError,
      hasUserIdError,
    } = this.state;

    return (
      <form onSubmit={this.handleFormSubmit}>
        <div>
          <input
            type="text"
            value={newTodoTitle}
            onChange={this.handleTodoTitleChange}
          />
          {hasTodoTitleError && (
            <span className="error">
              Please enter the title
            </span>
          )}
        </div>
        <div>
          <select
            value={newUserId}
            onChange={this.handleUserIdChange}
          >
            <option
              value="0"
            >
              Please choose a user
            </option>
            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {hasUserIdError && (
            <span className="error">
              Please choose a user
            </span>
          )}

        </div>

        <button type="submit">Add Todo</button>
      </form>
    );
  }
}

TodosForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
