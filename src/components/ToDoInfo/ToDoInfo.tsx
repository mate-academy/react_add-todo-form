import React from 'react';
import { ToDoWithUser } from '../../interfaces/ToDoWithUser';
import { UserInfo } from '../UserInfo';

import './ToDoInfo.scss';

type Props = {
  toDo: ToDoWithUser
};

export const ToDoInfo: React.FC<Props> = ({ toDo }) => {
  const {
    title,
    user,
    completed,
  } = toDo;

  return (
    <div className="toDoInfo">
      <h2 className="toDoInfo__title title">
        {title}
      </h2>
      <label>
        Is Completed:
        <input type="checkbox" defaultChecked={completed} />
      </label>
      <UserInfo user={user} />
    </div>
  );
};
