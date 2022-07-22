import React from 'react';
import { Todo } from '../../types/types';
import UserInfo from '../UserInfo/UserInfo';

type Props = Todo;

const TodoInfo: React.FC<Props> = ({ title, completed, user }) => (
  <>
    <UserInfo user={user} />
    <div>{'-'.repeat(60)}</div>
    <div className="todo-info">
      {`${title[0].toLocaleUpperCase()}`}
      {`${title.slice(1)}`}
    </div>
    <div className="todo-info">
      {`${completed ? 'Completely' : 'In progress'}`}
    </div>
  </>
);

export default TodoInfo;
