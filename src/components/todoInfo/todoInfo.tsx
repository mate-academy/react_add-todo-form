import { FC, memo } from 'react';
import { TodoDesc } from '../types/types';
import { UserInfo } from '../userInfo/userInfo';
import './todoInfo.scss';

export const TodoInfo: FC<TodoDesc> = memo(({ title, completed, user }) => {
  const status = completed
    ? 'filled'
    : 'not filled';

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
