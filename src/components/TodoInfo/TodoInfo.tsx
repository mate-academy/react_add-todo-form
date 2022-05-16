import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

type Props = Pick<Todo, 'user' | 'title' | 'completed'>;

export const TodoInfo: React.FC<Props> = ({ title, completed, user }) => {
  return (
    <>
      <h2 className="todo--heading">{title}</h2>
      <label className="item__checkbox">
        Done:
        <input
          type="checkbox"
          defaultChecked={completed}
          className="item__checkbox-input"
        />
      </label>

      {user && (
        <UserInfo
          name={user.name}
          username={user.username}
          email={user.email}
        />
      )}
    </>
  );
};
