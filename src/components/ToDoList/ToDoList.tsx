import React from 'react';
import { ToDoWithUser } from '../../interfaces/ToDoWithUser';
import { ToDoInfo } from '../ToDoInfo';

import './ToDoList.scss';

type Props = {
  toDos: Array<ToDoWithUser>
};

export const ToDoList: React.FC<Props> = ({ toDos }) => {
  return (
    <ul className="toDoList">
      {toDos.map(toDo => (
        <li key={toDo.id} className="toDoList__item">
          <ToDoInfo toDo={toDo} />
        </li>
      ))}
    </ul>
  );
};
