import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './NewTodo.css';

export class NewTodo extends Component {
  state = {
    users: this.props.users,
    id: this.props.todosLength,
    userId: 0,
    userName: '',
    value: '',
    placeholder: '',
    userSelectError: false,
  }

  selectUser = (event) => {
    const newTodoUser = this.props.users.find(
      user => user.id === Number(event.target.value),
    );

    this.setState({
      userName: newTodoUser.name,
      userId: event.target.value,
      userSelectError: false,
    });
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { value, id, userId } = this.state;
    const newTodo = {
      id: id + 1,
      title: value,
      userId: Number(userId),
    };

    this.props.addTodo(newTodo);

    this.setState({
      id: id + 1,
      value: '',
      userName: '',
      userId: 0,
      placeholder: '',
    });
  }

  validateForm = (event) => {
    event.preventDefault();

    if (!this.state.userName) {
      this.setState({
        userSelectError: true,
      });
    }

    if (!this.state.value.trim()) {
      this.setState({
        value: '',
        placeholder: 'Please enter the title',
      });
    }
  }

  render() {
    return (
      <form
        className={classNames({
          'user__select-error': this.state.userSelectError,
        })}
        onSubmit={
          this.state.userName && this.state.value.trim()
            ? this.handleSubmit
            : this.validateForm
        }
      >
        <select
          className="newtodo__select"
          onChange={this.selectUser}
          value={this.state.userId}
        >
          <option disabled value="0">Choose a user</option>
          {this.state.users.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))
          }
        </select>
        <input
          className="newtodo__input"
          onChange={this.handleChange}
          placeholder={this.state.placeholder}
          value={this.state.value}
        />
        <button
          type="submit"
          className="newtodo__button"
        >
          Add
        </button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  todosLength: PropTypes.number.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
};
