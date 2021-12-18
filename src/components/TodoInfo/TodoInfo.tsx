import React from 'react';
import UserInfo from '../UserInfo';
// import { Todo } from '../types/Todo';
import './TodoInfo.scss';
import { User } from '../types/User';

type Props = {
  title: string;
  completed: boolean;
  user: User | null;
  id: number;
  handleChecked: (id: number) => void;
};

export const TodoInfo: React.FC<Props> = ({
  title, completed, user, id, handleChecked,
}) => (
  <div className="Info">
    <input
      type="checkbox"
      checked={completed}
      onChange={() => handleChecked(id)}
    />
    <span className={completed ? 'to-do' : 'done'}>{completed ? 'done' : 'to do'}</span>
    <div className="Info__title">{title}</div>
    {user && <UserInfo name={user.name} email={user.email} />}
  </div>
);
