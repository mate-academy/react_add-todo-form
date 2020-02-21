import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './NewTodo.css';

export class NewTodo extends Component {
  state = {
    users: this.props.users,
    id: 2,
    userId: 0,
    userName: '',
    value: '',
    placeholder: '',
    userSelectError: false,
  }

  selectUser = (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      userName: prevState.users.find(
        user => user.id === Number(value),
      ).name,
      userId: value,
      userSelectError: false,
    }));
  }

  handleChange = (event) => {
    const { value } = event.target;

    this.setState({
      value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { value, id, userId, userName } = this.state;

    if (!(userName && value.trim())) {
      this.validateForm();
    } else {
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
  }

  validateForm = () => {
    const { userName, value } = this.state;

    if (!userName) {
      this.setState({
        userSelectError: true,
      });
    }

    if (!value.trim()) {
      this.setState({
        value: '',
        placeholder: 'Please enter the title',
      });
    }
  }

  render() {
    const {
      users,
      placeholder,
      value,
      userId,
      userSelectError,
    } = this.state;

    return (
      <form
        className={classNames({
          'user__select-error': userSelectError,
        })}
        onSubmit={this.handleSubmit}
      >
        <select
          className="newtodo__select"
          onChange={this.selectUser}
          value={userId}
        >
          <option disabled value="0">
            Choose a user
          </option>
          {users.map(user => (
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
          placeholder={placeholder}
          value={value}
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
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
};
