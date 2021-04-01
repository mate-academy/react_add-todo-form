import React from 'react';
import PropTypes from 'prop-types';
import './AddTodoForm.css';

import users from '../../api/users';

export class AddTodoForm extends React.Component {
  state = {
    selectedUserId: '',
    title: '',
    hasEmptyUserId: false,
    hasEmptyTitle: false,
  }

  handleSelectUser = (event) => {
    this.setState({
      selectedUserId: event.target.value,
      hasEmptyUserId: false,
    });
  };

  handleChangeTitle = (event) => {
    this.setState({
      title: event.target.value,
      hasEmptyTitle: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.state.title && !this.state.selectedUserId) {
      this.setState({
        hasEmptyTitle: true,
        hasEmptyUserId: true,
      });
    }

    if (!this.state.title) {
      return this.setState({
        hasEmptyTitle: true,
      });
    }

    if (!this.state.selectedUserId) {
      return this.setState({
        hasEmptyUserId: true,
      });
    }

    const newTodo = {
      userId: users.find(user => user.name === this.state.selectedUserId).id,
      id: this.props.todos.length + 1,
      title: this.state.title,
      completed: false,
      user: users.find(user => user.name === this.state.selectedUserId),
    };

    this.props.onAdd(newTodo);

    return this.setState(state => ({
      selectedUserId: '',
      title: '',
    }));
  }

  render() {
    const { title, selectedUserId } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <span className="error">
          {this.state.hasEmptyTitle && 'Enter the title'}
        </span>
        <br />
        <span className="error">
          {this.state.hasEmptyUserId && 'Choose the user'}
        </span>

        <div className="input-size">
          <input
            type="text"
            name="title"
            placeholder="Enter to do title"
            value={title}
            onChange={this.handleChangeTitle}
            className="input is-info"
          />
        </div>

        <div className="select is-link">
          <select
            value={selectedUserId}
            onChange={
              this.handleSelectUser
            }
          >
            <option value="">Choose a user</option>
            {users.map(user => (
              <option
                value={user.name}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className="button is-dark"
          type="submit"
        >
          Add new TODOs
        </button>
      </form>
    );
  }
}

AddTodoForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape(),
  ).isRequired,
};
