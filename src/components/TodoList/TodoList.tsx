import React from 'react';
import { PreparedTodo } from '../../react-app-env';
import { TodoInfo } from '../TodoInfo';

interface Props {
  prepTodos: PreparedTodo[];
}

export const TodoList: React.FC<Props> = ({ prepTodos }) => {
  return (
    <ul className="list-group list-group-horizontal">
      {prepTodos.map(todo => (
        <li
          className="
            list-group-item
            list-group-item-action
            list-group-item-info"
          key={todo.id}
        >
          <TodoInfo todo={todo} />
        </li>
      ))}
    </ul>
  );
};
