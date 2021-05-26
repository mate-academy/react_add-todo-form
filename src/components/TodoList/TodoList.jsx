import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './TodoList.scss';
import { Todo } from './Todo';

export class TodoList extends React.Component {
  state = {
    todos: [...this.props.todos],
    title: '',
    userName: '',
    isTitleAdd: true,
    isUserSelected: true,
  };

  handleChangeTitle = (event) => {
    const { value } = event.target;

    this.setState({
      title: value,
      isTitleAdd: true,
    });
  };

  handleChangeUser = (event) => {
    const { value } = event.target;

    this.setState({
      userName: value,
      isUserSelected: true,
    });
  };

  addTodo = (event) => {
    event.preventDefault();

    const { users } = this.props;

    this.setState(({ todos, title, userName }) => {
      if (!title && !userName) {
        return {
          isTitleAdd: false, isUserSelected: false,
        };
      }

      if (!title || title.length > 35 || title.length < 5) {
        return { isTitleAdd: false };
      }

      if (!userName) {
        return { isUserSelected: false };
      }

      return ({
        todos: [...todos, {
          id: todos[todos.length - 1].id + 1,
          title,
          completed: false,
          user: users.find(user => user.name === userName),
        }],
        title: '',
        userName: '',
      });
    });
  };

  render() {
    const { users } = this.props;
    const {
      todos,
      title,
      userName,
      isTitleAdd,
      isUserSelected,
    } = this.state;

    return (
      <>
        <form className="new-todo" onSubmit={this.addTodo}>
          <input
            type="text"
            name="title"
            className="new-todo__title"
            value={title}
            onChange={this.handleChangeTitle}
            placeholder="Write new todo..."
          />
          <p
            className={
              classNames(`new-todo__error-message`, { hide: isTitleAdd })
            }
          >
            * Please, enter your todo of 5-30 characters
          </p>
          <select
            name="userName"
            className="new-todo__user"
            value={userName}
            onChange={this.handleChangeUser}
          >
            <option disabled value="">Select user</option>
            {users.map(({ id, name }) => (
              <option key={id} value={name}>
                {name}
              </option>
            ))}
          </select>
          <p
            className={
              classNames(`new-todo__error-message`, { hide: isUserSelected })
            }
          >
            * Please, choose the user
          </p>
          <button type="submit" className="new-todo__button">Add</button>
        </form>

        <ul className="todo-list">
          {todos.map(todo => (
            <li className="todo-list__item" key={todo.id}>
              <Todo {...todo} />
            </li>
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

  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
