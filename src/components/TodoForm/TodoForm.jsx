import React from 'react';
import PropTypes from 'prop-types';
import './TodoForm.css';

import todos from '../../api/todos';

import { FormSelect } from '../FormSelect';
import { TodoList } from '../TodoList';

export class TodoForm extends React.Component {
  state = {
    todoList: todos,
    todoUserId: 0,
    todoTitle: '',
    todoId: todos.length,
    titleError: false,
  }

  addTodoUserId = (id) => {
    this.setState({ todoUserId: Number(id) });
  }

  addTodo() {
    const { todoUserId, todoId, todoTitle } = this.state;

    if (todoTitle.length !== 0 && todoUserId !== 0) {
      const newTodo = {
        userId: todoUserId,
        id: todoId + 1,
        title: todoTitle,
        completed: false,
      };

      this.setState(state => ({
        todoList: [...state.todoList, newTodo],
        todoId: state.todoId + 1,
      }));
    } else {
      this.setState({ titleError: true });
    }
  }

  render() {
    const { users } = this.props;

    return (
      <>
        <form className="App__form form">
          <FormSelect
            addTodoUserId={this.addTodoUserId}
            addTodo={this.addTodo}
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
            type="button"
            onClick={() => this.addTodo()}
          >
            add
          </button>
        </form>

        <div>
          {this.state.titleError && (
            <p>Please enter the title</p>
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
