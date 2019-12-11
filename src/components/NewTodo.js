import React from 'react';
import PropTypes from 'prop-types';
import users from '../api/users';
import '../App.css';

class NewTodo extends React.Component {
  state = {
    newTodo: '',
    selectedUserId: 0,
    todoError: false,
    userError: false,
  };

handleTodoChange = (event) => {
  this.setState({
    newTodo: event.target.value,
    todoError: false,
  });
};

handleUserChange = (event) => {
  this.setState({
    selectedUserId: +event.target.value,
    userError: false,
  });
};

handleFormSubmit = (event) => {
  event.preventDefault();
  const { newTodo, selectedUserId } = this.state;

  if (!newTodo || !selectedUserId) {
    this.setState({
      todoError: !newTodo,
      userError: !selectedUserId,
    });

    return;
  }

  this.props.addTodo(newTodo, selectedUserId);

  this.setState({
    newTodo: '',
    selectedUserId: 0,
  });
};

render() {
  const { newTodo, selectedUserId, todoError, userError } = this.state;

  return (
    <form onSubmit={this.handleFormSubmit}>
      <section className="todo__section">
        <input
          type="text"
          value={newTodo}
          onChange={this.handleTodoChange}
          placeholder="New TODO"
          className="todo__input"
        />

        {todoError && (
          <span className="error">
            Please, fill the form
          </span>
        )}

        <select
          value={selectedUserId}
          onChange={this.handleUserChange}
          className="todo__users"
        >
          <option value="0">Select User</option>
          {users.map(user => (
            <option
              value={user.id}
              key={user.name}
            >

              {user.name}
            </option>
          ))}
        </select>

        {userError && (
          <span className="error">
           Please, select user
          </span>
        )}

        <button
          className="button"
          type="submit"
        >
          Add
        </button>
      </section>
    </form>
  );
}
}

NewTodo.propTypes = { addTodo: PropTypes.func.isRequired };

export default NewTodo;
