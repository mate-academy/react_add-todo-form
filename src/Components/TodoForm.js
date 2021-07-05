import React from 'react';
import PropTypes from 'prop-types';

export class TodoForm extends React.Component {
  state = {
    task: '',
    selectedUserId: 0,
    inputIsValid: false,
    selectIsValid: false,
  }

  handleInput = (value) => {
    this.setState({
      task: value.replace(/^\s/g, '').replace(/\s/g, ' '),
      inputIsValid: false,
    });
  }

  handleSelect = (value) => {
    this.setState({
      selectedUserId: +value,
      selectIsValid: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { task, selectedUserId } = this.state;
    const { addNewTodo } = this.props;

    if (!task) {
      return this.setState({
        inputIsValid: true,
      });
    }

    if (selectedUserId === 0) {
      return this.setState({
        selectIsValid: true,
      });
    }

    addNewTodo(task, selectedUserId);

    return this.setState({
      task: '',
      selectedUserId: 0,
    });
  }

  render() {
    const { selectedUserId, task, inputIsValid, selectIsValid } = this.state;
    const { users } = this.props;

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        {
          inputIsValid && (
            <div>
              Invalid input
            </div>
          )
        }
        <input
          type="text"
          name="todo"
          placeholder="Input task"
          onChange={event => this.handleInput(event.target.value)}
          value={task}
        />
        {
          selectIsValid && (
            <div>
              No user selected
            </div>
          )
        }
        <select
          onChange={event => this.handleSelect(event.target.value)}
          value={selectedUserId}
        >
          <option value={0}>Select user</option>
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
