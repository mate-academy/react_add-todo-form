import React from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';

import './TodoList.css';

interface Props {
  preparedTodos: Todo[];
}

export class TodoList extends React.PureComponent<Props> {
  render() {
    const { preparedTodos: filteredTodos } = this.props;

    return (
      <div className="todo">
        <div className="todo__info-title">
          <span className="todo__field-info todo__field-info--title">
            Todo
          </span>
          <span className="todo__field-info">
            User name
          </span>
          <span className="todo__field-info">
            Status
          </span>
        </div>
        <ul className="todo__list">
          {filteredTodos.map(todo => (
            <li
              key={todo.id}
              className={classNames(
                'todo__item',
                { 'todo__item--done': todo.completed },
              )}
            >
              <span className="todo__field-info todo__field-info--title">
                {todo.title}
              </span>
              <span className="todo__field-info">
                {todo.user?.name}
              </span>
              <span className="todo__field-info">
                {todo.completed ? 'Done' : 'Active'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
