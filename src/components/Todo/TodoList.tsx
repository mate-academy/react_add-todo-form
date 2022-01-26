import React from 'react';
import { TodoInfo } from './TodoInfo';

import './Todos.scss';

type Props = {
  props: Todo[];
};

export const TodoList: React.FC<Props> = ({ props }) => {
  return (
    <ul className="todo">
      {props.map(todo => (
        <li key={todo.id} className="todo__list">
          <TodoInfo todo={todo} />
        </li>
      ))}
    </ul>
  );
};
