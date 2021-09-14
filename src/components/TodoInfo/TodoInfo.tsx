import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = (props) => {
  const { todo } = props;
  const { user, title, completed } = todo;

  return (
    <>
      {user && (
        <UserInfo user={user} />
      )}
      <div className="todo__title">
        {title}
      </div>
      <div className="todo__status">
        {completed ? 'Done' : 'In progress'}
      </div>
    </>
  );
};
