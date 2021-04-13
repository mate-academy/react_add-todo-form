import React from 'react';
import PropTypes from 'prop-types';

import users from '../api/users';

class AddTasksForm extends React.PureComponent {
  state = {
    taskName: '',
    selectedNameId: 0,
    hasTaskError: false,
    hasNameError: false,
  }

  handleTask = (event) => {
    this.setState({
      taskName: event.target.value,
      hasTaskError: false,
    });
  }

  handleNameChange = (event) => {
    this.setState({
      selectedNameId: +event.target.value,
      hasNameError: false,
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { taskName, selectedNameId } = this.state;

    if (!taskName || !selectedNameId) {
      this.setState({
        hasTaskError: !taskName,
        hasNameError: !selectedNameId,
      });

      return;
    }

    this.props.addTask(taskName, selectedNameId);

    this.setState({
      taskName: '',
      selectedNameId: 0,
    });
  }

  render() {
    const { taskName, selectedNameId, hasTaskError, hasNameError } = this.state;

    return (
      <form
        onSubmit={this.handleFormSubmit}
      >
        <div>
          <input
            type="text"
            placeholder="Enter the task"
            value={taskName}
            onChange={this.handleTask}
          />
          {
            hasTaskError && (
              <p>
                Please enter value
              </p>
            )
          }
        </div>

        <div>
          <select
            value={selectedNameId}
            onChange={this.handleNameChange}
          >
            <option value="0">Choose a name</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {
            hasNameError && (
              <p>
                Please enter value
              </p>
            )
          }
        </div>

        <button
          type="submit"
        >
          Add
        </button>
      </form>
    );
  }
}

AddTasksForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default AddTasksForm;
