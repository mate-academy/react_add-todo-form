import React from 'react';
import PropTypes from 'prop-types';
import './AddTodoForm.css';

import users from '../../api/users';

export class AddTodoForm extends React.Component {
  state = {
    selectedUser: '',
    titletext: '',
    hasEmptyName: false,
    hasEmptyTitle: false,
  }

  setUser = (event) => {
    this.setState({
      selectedUser: event.target.value,
      hasEmptyName: false,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.state.titletext && !this.state.selectedUser) {
      this.setState({
        hasEmptyTitle: true,
        hasEmptyName: true,
      });
    }

    if (!this.state.titletext) {
      return this.setState({
        hasEmptyTitle: true,
      });
    }

    if (!this.state.selectedUser) {
      return this.setState({
        hasEmptyName: true,
      });
    }

    const newTodo = {
      userId: users.find(user => user.name === this.state.selectedUser).id,
      id: this.props.todos.length + 1,
      title: this.state.titletext,
      completed: false,
      user: users.find(user => user.name === this.state.selectedUser),
    };

    this.props.onAdd(newTodo);

    return this.setState(state => ({
      selectedUser: '',
      titletext: '',
    }));
  }

  handleChange = (event) => {
    this.setState({
      titletext: event.target.value,
      hasEmptyTitle: false,
    });
  }

  render() {
    const { titletext, selectedUser } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <span className="error">
          {this.state.hasEmptyTitle && 'Enter the title'}
        </span>
        <br />
        <span className="error">
          {this.state.hasEmptyName && 'Choose the user'}
        </span>

        <div className="input-size">
          <input
            type="text"
            name="title"
            placeholder="Enter to do title"
            value={titletext}
            onChange={this.handleChange}
            className="input is-info"
          />
        </div>

        <div className="select is-link">
          <select
            value={selectedUser}
            onChange={
              this.setUser
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
