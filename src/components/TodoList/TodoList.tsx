import React from 'react';
import './TodoList.scss';

import { TodoInfo } from '../TodoInfo/TodoInfo';

import { Todo } from '../../types/Todo';

type Props = {
  props: Todo[],
};

export const TodoList: React.FC<Props> = ({ props }) => {
  return (
    <ul className="list">
      {props.map(prop => (
        <TodoInfo todo={prop} key={prop.id} />
      ))}
    </ul>
  );
};
