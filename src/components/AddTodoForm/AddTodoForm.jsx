import React from 'react';
import PropTypes from 'prop-types';

import users from '../../api/users';

class AddTodoForm extends React.Component {
  state = {
    newTaskTitle: '',
    newTaskUser: 0,
    hasUserError: false,
    hasTaskError: false,
  }

  handleUserChange = (event) => {
    this.setState({
      newTaskUser: +event.target.value,
      hasUserError: false,
    });
  }

  handleTaskChange = (event) => {
    this.setState({
      newTaskTitle: event.target.value,
      hasTaskError: false,
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    this.setState(state => ({
      hasTaskError: !state.newTaskTitle,
      hasUserError: !state.newTaskUser,
    }));

    const { newTaskUser, newTaskTitle } = this.state;

    if (!newTaskTitle || !newTaskUser) {
      return;
    }

    this.props.onAdd(newTaskUser, newTaskTitle);

    this.setState({
      newTaskTitle: '',
      newTaskUser: 0,
      hasUserError: false,
      hasTaskError: false,
    });
  }

  render() {
    const {
      newTaskTitle,
      newTaskUser,
      hasTaskError,
      hasUserError,
    } = this.state;

    return (
      <>
        <h1>Add todo form</h1>
        <form
          onSubmit={this.handleFormSubmit}
        >
          <div>
            <select
              name="user"
              value={newTaskUser}
              onChange={this.handleUserChange}
            >
              <option
                value="0"
              >
                Choose a user
              </option>
              {users.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))
                }
            </select>
            {hasUserError && (
              <span className="error">Please choose a user</span>
            )}
          </div>
          <div>
            <textarea
              placeholder="New task..."
              value={newTaskTitle}
              onChange={this.handleTaskChange}
            />
            {hasTaskError && (
              <span className="error">Please enter the title</span>
            )}
          </div>
          <button
            type="submit"
          >
            Add
          </button>
        </form>
      </>
    );
  }
}

AddTodoForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default AddTodoForm;
