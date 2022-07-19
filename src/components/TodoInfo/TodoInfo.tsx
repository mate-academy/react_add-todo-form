import React from 'react';
import { Todo } from '../../types/types';

type Props = Todo;

const TodoInfo: React.FC<Props> = ({ title, completed }) => (
  <>
    <div className="todo-info">
      {`${title[0].toLocaleUpperCase()}`}
      {`${title.slice(1)}`}
    </div>
    <div className="todo-info">
      {`${completed ? 'Completely' : 'In progress'}`}
    </div>
  </>
);

export default TodoInfo;
