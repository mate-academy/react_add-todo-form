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
      hasTodoTitleError: false,
    });
  }

  handleUserIdChange = (event) => {
    this.setState({
      newUserId: +event.target.value,
      hasUserIdError: false,
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { newTodoTitle, newUserId } = this.state;

    this.setState(state => ({
      hasTodoTitleError: !state.newTodoTitle,
      hasUserIdError: !state.newUserId,
    }));

    if (!newTodoTitle) {
      return;
    }

    if (!newUserId) {
      return;
    }

    this.props.onAdd(newTodoTitle, newUserId);

    this.setState({
      newTodoTitle: '',
      newUserId: 0,
    });
  };

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
