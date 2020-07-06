import React from 'react';
import PropTypes from 'prop-types';

export class TodoForm extends React.Component {
  state = {
    task: '',
    selectedUserId: 0,
    isValidInput: false,
    isValidSelect: false,
  }

  handleInputChange = (value) => {
    this.setState({
      task: value.replace(/\s/, ' ').replace(/^\s/, ''),
      isValidInput: false,
    });
  }

  handleSelectChange = (value) => {
    this.setState({
      selectedUserId: +value,
      isValidSelect: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { task, selectedUserId } = this.state;
    const { addNewTodo } = this.props;

    if (!task) {
      this.setState({
        isValidInput: true,
      });

      return false;
    }

    if (selectedUserId === 0) {
      this.setState({
        isValidSelect: true,
      });

      return false;
    }

    addNewTodo(task, selectedUserId);

    this.setState({
      task: '',
      selectedUserId: 0,
    });

    return true;
  }

  render() {
    const { selectedUserId, task, isValidInput, isValidSelect } = this.state;
    const { users } = this.props;

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        {
          isValidInput && (
            <div>
              Write your task, please!
            </div>
          )
        }
        <input
          type="text"
          name="todo"
          placeholder="Write your task here"
          maxLength="100"
          onChange={event => this.handleInputChange(event.target.value)}
          value={task}
        />
        {
          isValidSelect && (
            <div>
              Select a user, please!!!
            </div>
          )
        }
        <select
          onChange={event => this.handleSelectChange(event.target.value)}
          value={selectedUserId}
        >
          <option value={0}>Select user ...</option>
          {users.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
        >
          Add
        </button>
      </form>
    );
  }
}

TodoForm.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};
