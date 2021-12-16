import React from 'react';
import { Todo } from '../../types/Todo';

interface State {
  readyTodos: Todo[]
}

export class TodoList extends React.Component<State> {
  state = {};

  render(): React.ReactNode {
    return (
      <ul className="todo-list">
        {this.props.readyTodos.map(task => (
          <li
            key={task.id}
            className="todo-list__list-item"
          >
            {task.title}
            <br />
            Completed:
            <input
              type="checkbox"
              checked={task.completed}
            />
          </li>
        ))}
      </ul>
    );
  }
}
