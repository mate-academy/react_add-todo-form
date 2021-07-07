import React from 'react';
import PropTypes from 'prop-types';

import { Todo } from '../Todo/Todo';
import users from '../../api/users';

import './TodoList.css';

export class TodoList extends React.PureComponent {
  state = {
    todos: this.props.todos,
    value: '',
    userName: '',
    isEmptyTitle: false,
    isEmptyUser: false,
  }

  handleTodoInput = (event) => {
    this.setState({
      value: event.target.value
        .replace(/[^a-z0-9а-я ]/gi, '')
        .trimLeft(),
      isEmptyTitle: false,
    });
  }

  handleUserSelect = (event) => {
    this.setState({
      userName: event.target.value,
      isEmptyUser: false,
    });
  }

  addTodo = () => {
    this.setState(state => ({
      todos: [
        ...state.todos,
        {
          userId: state.userName
            ? (users.find(user => state.userName === user.name).id)
            : 0,
          id: state.todos.length + 1,
          title: state.value,
        },
      ],
    }));

    if (!this.state.value) {
      this.setState({
        isEmptyTitle: true,
      });
    }

    if (!this.state.userName) {
      this.setState({
        isEmptyUser: true,
      });
    }

    if (!this.state.value || !this.state.userName) {
      return;
    }

    this.setState({
      value: '',
      userName: '',
    });
  }

  render() {
    const { todos, value, userName, isEmptyTitle, isEmptyUser } = this.state;

    return (
      <>
        <form
          className="newtodo"
          onSubmit={event => (event.preventDefault())}
        >
          <input
            type="text"
            className="newtodo__name"
            placeholder="What to do?"
            value={value}
            onChange={this.handleTodoInput}
            maxLength="50"
          />
          {isEmptyTitle && (
            <span
              className="newtodo__error newtodo__error_title"
            >
              Please enter the title
            </span>
          )}
          <select
            value={userName}
            className="newtodo__users"
            onChange={this.handleUserSelect}
          >
            <option value="" className="newtodo__user">Choose a user</option>
            {users.map(user => (
              <option key={user.id} className="newtodo__user">
                {user.name}
              </option>
            ))}
          </select>
          {isEmptyUser && (
            <span
              className="newtodo__error newtodo__error_user"
            >
              Please choose a user
            </span>
          )}

          <button
            type="submit"
            onClick={this.addTodo}
            className="newtodo__add"
          >
            Add
          </button>
        </form>

        <ul className="list">
          {todos.map(todo => (
            todo.title && todo.userId > 0 && (
              <li className="list__item" key={todo.id}>
                <Todo {...todo} />
              </li>
            )
          ))}
        </ul>
      </>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
