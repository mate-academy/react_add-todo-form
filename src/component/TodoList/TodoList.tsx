import React from 'react';
import { Todo } from '../type/todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.scss';

type Props = {
  prepared:Todo[],
};

export const TodoList: React.FC<Props> = ({ prepared }) => (
  <div className="Wrapper">
    <ul className="List">
      {prepared.map((ToDo) => (
        <li className="List__item" key={ToDo.id}>
          <TodoInfo todo={ToDo} />
        </li>
      ))}
    </ul>
  </div>
);
