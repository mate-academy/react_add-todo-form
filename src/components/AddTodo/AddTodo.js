import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class AddTodo extends Component {
  state = {
    id: 3,
    title: '',
    userId: 0,
    showError: false,
  }

  handleSelect = ({ target: { value } }) => {
    this.setState({
      userId: +value,
    });
  };

  handleInput = ({ target: { value } }) => {
    this.setState({
      title: value.trim(),
    });
  };

  handleSubmitForm = (event) => {
    event.preventDefault();
    const { id, title, userId } = this.state;
    const { users } = this.props;

    if ((userId !== 0) && (title !== '')) {
      this.props.addTodo({
        id,
        user: users.find(user => user.id === userId),
        title,
        userId,
      });

      this.setState({
        id: id + 1,
        title: '',
        userId: 0,
        showError: false,
      });
    } else {
      this.setState({
        showError: true,
      });
    }
  }

  render() {
    const { userId, title, showError } = this.state;
    const { users } = this.props;

    return (
      <form
        name="newTodo"
        onSubmit={this.handleSubmitForm}
      >
        <label>
          <input
            name="title"
            type="text"
            onChange={this.handleInput}
            value={title}
            placeholder="Enter the title"
          />
        </label>

        <label>
          <select
            name="userId"
            onChange={this.handleSelect}
            value={userId}
          >
            <option value="">Choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
        {showError && <p>please fill in all fields</p>}
        <button type="submit">
          Add
        </button>
      </form>
    );
  }
}

AddTodo.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
    }).isRequired,
  ).isRequired,
  addTodo: PropTypes.func.isRequired,
};
