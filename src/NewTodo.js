import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    newText: '',
    newUser: 0,
    error: '',
  };

  maxTextLen = 25;

  handleNewText = (event) => {
    if (event.target.value.length >= this.maxTextLen) {
      this.setState({ newText: event.target.value.slice(0, this.maxTextLen) });
    } else {
      this.setState({ newText: event.target.value });
    }
  }

  handleNewUser = (event) => {
    this.setState({ newUser: event.target.value });
  }

  validateForm = (event) => {
    event.preventDefault();

    if (!this.state.newText) {
      this.setState({ error: 'Please enter the title' });
    } else if (!this.state.newUser) {
      this.setState({ error: 'Please choose a user' });
    } else {
      this.props.addTodo({
        title: this.state.newText,
        userId: +this.state.newUser,
      });
      this.setState({ newText: '' });
    }
  }

  render() {
    return (
      <form onSubmit={this.validateForm}>
        <input
          type="text"
          value={this.state.newText}
          onChange={this.handleNewText}
          className="todo__input"
          placeholder="New TODO"
        />
        <span className="todo__text">
          Select User
        </span>
        <select
          onChange={this.handleNewUser}
          className="todo__users"
        >
          <option value="">
            {''}
          </option>
          {this.props.users.map(user => (
            <option
              key={user.name}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
        <span className="todo__error">
          {this.state.error}
        </span>
        <input
          type="submit"
          value="Add"
          className="todo__button"
        />
      </form>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf.isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default NewTodo;
