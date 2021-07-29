import React from 'react';
import PropTypes from 'prop-types';
import users from '../../api/users';
import './AddTodoForm.scss';

export class AddTodoForm extends React.Component {
  state = {
    newTodoName: '',
    newUserId: 0,
    hasTodoError: false,
    hasUserError: false,
  };

  handleTodoChange = (event) => {
    this.setState({
      newTodoName: event.target.value,
      hasTodoError: false,
    });
  };

  handleUserChange = (event) => {
    this.setState({
      newUserId: +event.target.value,
      hasUserError: false,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    this.setState(state => ({
      hasTodoError: !state.newTodoName,
      hasUserError: !state.newUserId,
    }));

    const { newTodoName, newUserId } = this.state;

    if (!newTodoName) {
      return;
    }

    if (!newUserId) {
      return;
    }

    this.props.onAdd(newTodoName, newUserId);

    this.setState({
      newTodoName: '',
      newUserId: 0,
    });
  };

  render() {
    const {
      newTodoName,
      newUserId,
      hasUserError,
      hasTodoError,
    } = this.state;

    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className="div">
          <input
            className="input"
            type="text"
            value={newTodoName}
            onChange={this.handleTodoChange}
            placeholder="Enter a Todo"
          />
          {hasTodoError && (
            <span className="error">Please enter a Todo</span>
          )}
        </div>

        <div className="div">
          <select
            className="input"
            value={newUserId}
            onChange={this.handleUserChange}
          >
            <option>Select a User</option>

            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {hasUserError && (
            <span className="error">Please select a User</span>
          )}
        </div>

        <button className="button" type="submit">Add</button>
      </form>
    );
  }
}

AddTodoForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
