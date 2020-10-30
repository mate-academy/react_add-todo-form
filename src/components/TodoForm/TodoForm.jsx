import React from 'react';
import PropTypes from 'prop-types';
import './TodoForm.css';

import todos from '../../api/todos';

import { FormSelect } from '../FormSelect';
import { TodoList } from '../TodoList';

export class TodoForm extends React.PureComponent {
  state = {
    todoList: todos,
    todoUserId: 0,
    todoTitle: '',
    todoId: todos.length,
    titleError: false,
    usernameError: false,
    username: '',
  }

  addTodoUserId = (id) => {
    this.setState({ todoUserId: Number(id) });
  }

  handleChange = (target) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
      [`${name}Error`]: false,
    });
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { todoTitle, username } = this.state;

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
      todoTitle: '',
      todoId: state.todoId + 1,
    }));
  }

  render() {
    const { users } = this.props;

    return (
      <>
        <form
          className="App__form form"
          onSubmit={event => (
            this.onSubmit(event)
          )}
        >
          <FormSelect
            username={this.state.username}
            addTodoUserId={this.addTodoUserId}
            addTodo={this.addTodo}
            handleChange={this.handleChange}
            users={users}
          />

          <input
            className="form__input"
            type="text"
            placeholder="write task here"
            value={this.state.todoTitle}
            onChange={(event) => {
              this.setState({
                todoTitle: event.target.value.replace(/[^\w\s]/gi, ''),
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

        <div>
          {this.state.titleError && (
            <p>Please fill a title</p>
          )}

          {this.state.usernameError && (
            <p>Please choose a user</p>
          )}
        </div>

        <ul className="App__todo-list list">
          <TodoList todoList={this.state.todoList} />
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
