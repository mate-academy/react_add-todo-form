import { FC, memo } from 'react';
import { Todo } from '../../types';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

export const TodoInfo: FC<Todo> = memo(({ title, completed, user }) => {
  const status = completed
    ? 'completed'
    : 'not completed';

  return (
    <div className="todoInfo">
      <p className="todoInfo__title">{title}</p>
      <p className="todoInfo__status">{status}</p>
      {
        user && <UserInfo {...user} />
      }
    </div>
  );
});
