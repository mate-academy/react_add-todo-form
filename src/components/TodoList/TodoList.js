import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';

import { Todo } from '../Todo/Todo';
import { NewTodo } from '../NewTodo/NewTodo';

export class TodoList extends Component {
  state = {
    todos: this.props.todos,
    users: this.props.users,
  };

  updateTodos = (todo) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        todo,
      ],
    }));
  }

  render() {
    const { todos, users } = this.state;

    return (
      <div className="todo-list">
        <NewTodo updateTodos={this.updateTodos} users={users} />
        <table className="todo-list__table table">
          <thead>
            <tr className="todo-list__row table__head">
              <th className="todo-list__cell">#Id</th>
              <th className="todo-list__cell">#Task</th>
              <th className="todo-list__cell">#User</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(item => (
              <Todo key={item.id} todo={item} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
