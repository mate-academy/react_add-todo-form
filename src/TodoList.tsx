import React from 'react';
import { TodoInfo } from './TodoInfo';

type Props = {
  props: Todo[];
};

export const TodoList: React.FC<Props> = ({ props }) => {
  return (
    <ul>
      {props.map(todo => (
        <li key={todo.id}>
          <TodoInfo todo={todo} />
        </li>
      ))}
    </ul>
  );
};
