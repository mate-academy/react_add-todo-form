import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';
import './TodoList.scss';

export class TodoList extends React.Component {
  state = {
    todos: [...this.props.todos],
    users: [...this.props.users],
    todoTitle: '',
    userName: '',
    todoTitleError: false,
    userNameError: false,
    nextId: this.props.todos.length,
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: name === 'userName' ? +value : value.slice(0, 30).trimLeft(),
      [`${[name]}Error`]: !value.match(/^[\w\s]+$/i),
    });
  };

  handleSubmit = (event) => {
    const {
      nextId,
      todoTitle,
      userName,
      todoTitleError,
    } = this.state;

    event.preventDefault();

    if (!userName
      || !todoTitle
      || todoTitleError
      || !todoTitle.match(/^[\w\s]+$/i)
    ) {
      this.setState({
        userNameError: !userName,
        todoTitleError: todoTitleError || !todoTitle,
      });
    } else {
      const newObj = {
        userId: userName,
        id: nextId + 1,
        title: todoTitle,
        completed: Math.random() > 0.5,
      };

      this.setState(state => ({
        nextId: state.nextId + 1,
        todos: [...state.todos, newObj],
        todoTitle: '',
        userName: '',
      }));
    }
  };

  render() {
    const { users, todos, todoTitle, userName, todoTitleError, userNameError }
      = this.state;

    return (
      <div className="todosForm">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="todoTitle">Todo title</label>
          <input
            className={classNames('todoTitle', { error: todoTitleError })}
            type="text"
            name="todoTitle"
            placeholder="Enter todo title"
            value={todoTitle}
            onChange={this.handleChange}
          />
          <label htmlFor="User name">User name</label>
          <select
            className={classNames({ error: userNameError })}
            name="userName"
            value={userName}
            onChange={this.handleChange}
            id="userName"
          >
            <option
              className="firstOption"
              value=""
            >
              Please choose a user
            </option>
            {users.map(user => (
              <option
                className="nextOptions"
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          <button type="submit" className="submitButton">
            Add task
          </button>
        </form>
        <div className="todoCard">
          {todos.map((todo) => {
            const user = users.find(person => person.id === todo.userId);

            return (
              <React.Fragment key={todo.id}>
                <Todo {...todo} user={user} />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
};
