import React from 'react';
import PropTypes from 'prop-types';
import './Form.css';

export class Form extends React.Component {
  state = {
    selectedUserId: 0,
    newTodoTitle: '',
    hasTodoTitle: false,
    hasSelectedUser: false,
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { selectedUserId, newTodoTitle } = this.state;

    if (!selectedUserId || !newTodoTitle) {
      this.setState({
        hasTodoTitle: !newTodoTitle,
        hasSelectedUser: !selectedUserId,
      });

      return;
    }

    this.props.addTodo(newTodoTitle, selectedUserId);

    this.setState({
      selectedUserId: 0,
      newTodoTitle: '',
    });
  }

  handeTitle = event => (
    this.setState({
      newTodoTitle: event.target.value,
      hasTodoTitle: false,
    })
  )

  handleUserName = event => (
    this.setState({
      selectedUserId: +event.target.value,
      hasSelectedUser: false,
    })
  )

  render() {
    const {
      selectedUserId,
      newTodoTitle,
      hasTodoTitle,
      hasSelectedUser,
    } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.handleFormSubmit}
      >
        <label
          className="label"
          htmlFor="todo"
        >
          {`Todo name: `}
        </label>
        <input
          className="input"
          type="text"
          id="todo"
          value={newTodoTitle}
          placeholder="Todo name *"
          onChange={this.handeTitle}
        />
        {hasTodoTitle && (
          <span className="error">Please fill in this field!</span>
        )}

        <label
          className="label"
          htmlFor="checking-user"
        >
          {`Users: `}
        </label>
        <select
          className="input"
          id="checking-user"
          value={selectedUserId}
          onChange={this.handleUserName}
        >
          <option value="0">Choose a user *</option>

          {this.props.users.map(({ id, name }) => (
            <option
              key={id}
              value={id}
            >
              {name}
            </option>
          ))}
        </select>

        {hasSelectedUser && (
          <span className="error">
            Please choose a user!
          </span>
        )}

        <button
          className="button"
          type="submit"
        >
          Add Todo
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  addTodo: PropTypes.func.isRequired,
};
