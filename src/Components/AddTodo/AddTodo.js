import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class AddTodo extends Component {
  state = {
    id: 3,
    title: '',
    userId: 0,
    selectError: false,
    inputError: false,
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      title: value,
      inputError: false,
    });
  }

  handleSubmitChange = ({ target: { value } }) => {
    this.setState({
      userId: +value,
      selectError: false,
    });
  }

  handleSubmitForm = (event) => {
    event.preventDefault();
    const { id, title, userId, selectError, inputError } = this.state;

    if (title.trim() === '') {
      this.setState({
        inputError: true,
      });

      return;
    }

    if (userId === 0) {
      this.setState({
        selectError: true,
      });

      return;
    }

    if (!selectError && !inputError) {
      const { users } = this.props;

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
      });
    }
  }

  render() {
    const { userId, title, selectError, inputError } = this.state;
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
            onChange={this.handleInputChange}
            value={title}
            placeholder="Enter the title"
          />
        </label>
        {inputError && (
          <div>
            Please enter the title
          </div>
        )}

        <label>
          <select
            name="userId"
            onChange={this.handleSubmitChange}
            value={userId}
            error={selectError}
          >
            <option value="">Choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
        {selectError && (
          <div>Please, chose user name!</div>
        )}

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
