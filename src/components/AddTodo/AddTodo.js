import React from 'react';
import PropTypes from 'prop-types';
import { UserType, PreparedTodoType } from '../../types';
import './AddTodo.css';

export class AddTodo extends React.Component {
  state = {
    title: '',
    userId: '',
    validUser: true,
    validTitle: true,
  }

  handleChange = (event) => {
    const { name } = event.target;
    let { value } = event.target;
    let flag;

    switch (name) {
      case 'title': {
        flag = 'validTitle';
        break;
      }

      case 'userId': {
        flag = 'validUser';
        break;
      }

      default: {
        break;
      }
    }

    if (name === 'title') {
      value = value.replace(/[^A-Za-z0-9 ]/g, '');
    }

    this.setState({
      [name]: value,
      [flag]: true,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, userId } = this.state;

    if (!this.checkInputs(title, userId)) {
      return;
    }

    const todoId = this.props.todos.reduce((id, todo) => (
      id > todo.id ? id : todo.id
    ), Number.NEGATIVE_INFINITY) + 1;
    const user = this.props.users.find(todoUser => todoUser.id === +userId);
    const todo = {
      userId: +userId,
      id: todoId,
      title,
      completed: false,
      user,
    };

    this.props.app.addTodo(todo);
    this.reset();
  };

  reset = () => {
    this.setState({
      title: '',
      userId: '',
      validUser: true,
      validTitle: true,
    });
  }

  checkInputs = (title, userId) => {
    let check = true;

    if (title === '') {
      this.setState({
        validTitle: false,
      });

      check = false;
    }

    if (userId === '') {
      this.setState({
        validUser: false,
      });

      check = false;
    }

    return check;
  };

  render() {
    return (
      <form
        className="addTodoForm"
        onSubmit={this.handleSubmit}
      >
        <label
          htmlFor="title"
          className="addTodoForm__label"
        >
          Title(
          30 chars maximum
          ):
          <input
            type="text"
            id="title"
            name="title"
            value={this.state.title}
            placeholder="Title"
            maxLength={30}
            onChange={this.handleChange}
          />
          {(this.state.validTitle
            ? ''
            : (
              <span
                className="addTodoForm__label-message"
              >
                Please enter the title
              </span>
            )
            )}
        </label>
        <label
          htmlFor="userId"
          className="addTodoForm__label"
        >
          User:
          <select
            name="userId"
            id="userId"
            value={this.state.userId}
            onChange={this.handleChange}
          >
            <>
              <option value="">
                Choose a user
              </option>
              {this.props.users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </>
          </select>
          {(this.state.validUser
            ? ''
            : (
              <span
                className="addTodoForm__label-message"
              >
                Please choose a user
              </span>
            )
            )}
        </label>
        <button
          type="submit"
          className="addTodoForm__submit"
        >
          Add
        </button>
      </form>
    );
  }
}

AddTodo.propTypes = {
  users: PropTypes.arrayOf(UserType).isRequired,
  todos: PropTypes.arrayOf(PreparedTodoType).isRequired,
  app: PropTypes.shape({
    addTodo: PropTypes.func.isRequired,
  }).isRequired,
};
