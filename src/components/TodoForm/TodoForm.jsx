import React from 'react';
import PropTypes from 'prop-types';
import './TodoForm.css';

import todos from '../../api/todos';

import { SelectOption } from '../SelectOption';
import { TodoList } from '../TodoList';

export class TodoForm extends React.PureComponent {
  state = {
    todoList: todos,
    todoUserId: 0,
    todoTitle: '',
    username: '',
    todoId: todos.length,
    titleError: false,
    usernameError: false,
  }

  addTodoUserId = (id) => {
    this.setState({ todoUserId: Number(id) });
  }

  handleChange = (target) => {
    this.setState({
      username: target.value,
      titleError: false,
      usernameError: false,
    });
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { todoTitle, username } = this.state;

    if (todoTitle === '' && username === '') {
      this.setState({
        usernameError: true,
        titleError: true,
      });

      return;
    }

    if (todoTitle === '') {
      this.setState({
        titleError: true,
      });

      return;
    }

    if (username === '') {
      this.setState({
        usernameError: true,
      });

      return;
    }

    this.addTodo();

    this.setState({
      todoTitle: '',
      username: '',
      titleError: false,
    });
  }

  addTodo() {
    const { todoUserId, todoId, todoTitle } = this.state;
    const newTodo = {
      userId: todoUserId,
      id: todoId + 1,
      title: todoTitle,
      completed: false,
      defaultValue: 'choose',
    };

    this.setState(state => ({
      todoList: [...state.todoList, newTodo],
      todoId: state.todoId + 1,
    }));
  }

  render() {
    const { users } = this.props;
    const { username,
      todoTitle,
      titleError,
      usernameError,
      todoList } = this.state;

    return (
      <>
        <form
          className="App__form form"
          onSubmit={this.onSubmit}
        >
          <select
            className="form__select select"
            name="username"
            id="username"
            value={username}
            onChange={(event) => {
              this.addTodoUserId(event.target.value);
              this.handleChange(event.target);
            }}
          >
            <SelectOption users={users} />
          </select>

          <input
            className="form__input"
            type="text"
            placeholder="write task here"
            value={todoTitle}
            onChange={(event) => {
              this.setState({
                todoTitle: event.target.value.replace(/[^\w\s]/g, ''),
              });
            }}
          />

          <button
            className="form__submit-button"
            type="submit"
          >
            add
          </button>
        </form>

        {titleError && (
          <p>Please fill a title</p>
        )}

        {usernameError && (
          <p>Please choose a user</p>
        )}

        <ul className="App__todo-list list">
          <TodoList
            todoList={todoList}
          />
        </ul>
      </>
    );
  }
}

TodoForm.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
