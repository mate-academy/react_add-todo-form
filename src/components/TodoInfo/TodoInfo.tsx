import React from 'react';
import { PreparedToDo } from '../../types/PreparedToDo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  preparedToDo: PreparedToDo;
};

export const TodoInfo: React.FC<Props> = ({ preparedToDo }) => {
  return (
    <div className="card-content">
      <h2 className="title is-4" data-cy="title">{preparedToDo.title}</h2>
      <p className="complet" data-cy="status">
        {preparedToDo.completed ? (
          <strong>
            completed
          </strong>
        ) : (
          <strong>
            not completed
          </strong>
        ) }
      </p>
      <UserInfo user={preparedToDo.user}>
        {preparedToDo.user ? '' : 'Unknown'}
      </UserInfo>
    </div>
  );
};
