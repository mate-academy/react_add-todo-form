import { FC } from 'react';
import { User } from '../../types/User';
import './todoInfo.scss';

interface Props {
  title: string;
  completed: boolean;
  user: User | null;
}

export const TodoInfo: FC<Props> = ({ title, completed, user }) => {
  return (
    <ul>
      <li>
        <span className="keys">Title: </span>
        <span className="values">{title}</span>
      </li>

      <li>
        <span className="keys">Completed: </span>
        <span className="values">{String(completed)}</span>
      </li>

      {user && (
        <>
          <li>
            <span className="keys">Username: </span>
            <span className="values">{user.username}</span>
          </li>

          <li>
            <span className="keys">UserPhone: </span>
            <span className="values">{user.phone}</span>
          </li>
        </>
      )}
    </ul>
  );
};
