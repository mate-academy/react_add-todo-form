import React from 'react';
import PropTypes from 'prop-types';
import './TodoForm.css';

import users from '../../api/users';

export class TodoForm extends React.Component {
  state = {
    userName: '',
    todoTitle: '',
    isEmptyUser: false,
    isEmptyTitle: false,
    errors: {
      emptyUser: 'Please choose a user',
      emptyTitle: 'Please enter the title',
    },
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { userName, todoTitle } = this.state;
    const trimmedTitle = todoTitle.trim();

    if (userName !== '' && trimmedTitle !== '') {
      const { addTodo, todoLength } = this.props;
      const selectedUser = users
        .find(user => user.name === userName);

      addTodo(
        {
          userId: selectedUser.id,
          id: todoLength + 1,
          title: trimmedTitle,
          completed: false,
          user: selectedUser,
        },
      );

      this.setState(() => ({
        userName: '',
        todoTitle: '',
      }));
    }

    this.setState(() => ({
      isEmptyUser: userName === '',
      isEmptyTitle: trimmedTitle === '',
    }));
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(() => {
      if (name === 'userName') {
        return {
          [name]: value,
          isEmptyUser: false,
        };
      }

      return {
        [name]: value,
        isEmptyTitle: false,
      };
    });
  }

  render() {
    const {
      userName,
      todoTitle,
      isEmptyUser,
      isEmptyTitle,
      errors,
    } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <div>
          <input
            name="todoTitle"
            type="text"
            placeholder="Enter the title"
            className="form__input"
            autoComplete="off"
            value={todoTitle}
            onChange={this.handleChange}
          />

          {
            isEmptyTitle
            && <span className="form__message">{errors.emptyTitle}</span>
          }
        </div>

        <div>
          <select
            name="userName"
            className="form__select"
            value={userName}
            onChange={this.handleChange}
          >
            <option value="">Choose a user</option>
            {users.map(user => (
              <option key={user.name} value={user.name}>{user.name}</option>
            ))}
          </select>

          {
            isEmptyUser
            && <span className="form__message">{errors.emptyUser}</span>
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
