import classNames from 'classnames';
import React from 'react';
import { Todos } from '../../types/Todos';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

type Props = Omit<Todos, 'id' | 'userId'>;

export const TodoInfo: React.FC<Props> = ({ title, completed, user }) => {
  return (
    <>
      <h2 className="todo">{title}</h2>
      <p className={classNames('todo__completed',
        { todo__done: completed })}
      >
        {completed ? 'DONE' : 'NOT YET'}
      </p>
      {user
      && (
        <UserInfo
          name={user.name}
          username={user.username}
          email={user.email}
        />
      )}
    </>
  );
};
