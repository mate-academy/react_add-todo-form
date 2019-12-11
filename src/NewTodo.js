import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    newText: '',
    newUser: 0,
    errorText: false,
    errorUser: false,
  };

  maxTextLen = 25;

  handleNewText = (event) => {
    const { value } = event.target;

    if (value.length >= this.maxTextLen) {
      this.setState({ newText: value.slice(0, this.maxTextLen) });
    } else {
      this.setState({
        newText: value,
        errorText: false,
      });
    }
  }

  handleNewUser = (event) => {
    this.setState({
      newUser: event.target.value,
      errorUser: false,
    });
  }

  validateForm = (event) => {
    event.preventDefault();

    if (!this.state.newText || !this.state.newUser) {
      this.setState({
        errorText: true,
        errorUser: true,
      });

      return;
    }

    if (!this.state.errorText && !this.state.errorUser) {
      this.props.addTodo({
        title: this.state.newText,
        userId: +this.state.newUser,
      });
      this.setState({
        newText: '',
        errorText: false,
        errorUser: false,
      });
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
        <span className="todo__error">
          {this.state.errorText ? 'Please enter the title' : ''}
        </span>
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
          {this.state.errorUser ? 'Please choose a user' : ''}
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
