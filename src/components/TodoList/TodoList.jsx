import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';

export class TodoList extends PureComponent {
  render() {
    const { todos, onToggleToDo } = this.props;

    return (
      <ul>
        {todos.map(todo => (
          <label key={todo.id}>
            <li
              className={(todo.completed)
                ? 'todo completed '
                : 'todo not_completed'}
            >
              <Todo {...todo} onToggleToDo={onToggleToDo} />
              <input
                type="checkbox"
                id={todo.id}
                checked={todo.checked}
                onChange={event => onToggleToDo(event, todo.id)}
              />
            </li>
          </label>

        ))}
      </ul>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onToggleToDo: PropTypes.func.isRequired,
};
