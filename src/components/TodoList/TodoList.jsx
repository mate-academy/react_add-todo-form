/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';

import { Todo } from '../Todo';

import './TodoList.css';

export class TodoList extends React.Component {
  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
      userId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    })).isRequired,
  };

  render() {
    const { todos } = this.props;

    return (
      <table className="todo__table">
        <thead>
          <tr>
            <th>Task</th>
            <th>User</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id}>
              <Todo {...todo} />
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
