import React from 'react';
import PropTypes from 'prop-types';
import './TodoForm.css';

import users from '../../api/users';

export class TodoForm extends React.Component {
  state = {
    userName: '',
    todoTitle: '',
    showEmptyNameMessage: false,
    showEmptyTitleMessage: false,
  }

  setTodo = (event) => {
    event.preventDefault();

    const { userName, todoTitle } = this.state;
    const selectedUser = users
      .find(user => user.name === userName);

    if (userName !== '' && todoTitle.trim() !== '') {
      this.props.addTodo(
        {
          userId: selectedUser.id,
          id: this.props.todoLength + 1,
          title: todoTitle.trim(),
          completed: false,
          user: selectedUser,
        },
      );
    }

    this.setState(() => {
      if (userName !== '' && todoTitle.trim() !== '') {
        return {
          userName: '',
          todoTitle: '',
        };
      }

      return {
        showEmptyNameMessage: userName === '',
        showEmptyTitleMessage: todoTitle.trim() === '',
      };
    });
  }

  setTitle = (event) => {
    this.setState({
      todoTitle: event.target.value,
      showEmptyTitleMessage: false,
    });
  }

  setUser = (event) => {
    this.setState({
      userName: event.target.value,
      showEmptyNameMessage: false,
    });
  }

  render() {
    const {
      userName,
      todoTitle,
      showEmptyNameMessage,
      showEmptyTitleMessage,
    } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.setTodo}
      >
        <div>
          <input
            type="text"
            placeholder="Enter the title"
            className="form__input"
            autoComplete="off"
            value={todoTitle}
            onChange={this.setTitle}
          />

          {
            showEmptyTitleMessage
            && <span className="form__message">Please enter the title</span>
          }
        </div>

        <div>
          <select
            className="form__select"
            value={userName}
            onChange={this.setUser}
          >
            <option value="">Choose a user</option>
            {users.map(user => (
              <option key={user.name} value={user.name}>{user.name}</option>
            ))}
          </select>

          {
            showEmptyNameMessage
            && <span className="form__message">Please choose a user</span>
          }
        </div>

        <button className="form__button" type="submit">Add</button>
      </form>
    );
  }
}

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
  todoLength: PropTypes.number.isRequired,
};
