import React from 'react';
import UserInfo from '../UserInfo/UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: Todo;
};

const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, completed, user } = todo;

  return (
    <>
      {user && <UserInfo user={user} />}
      <div className="todo">
        <p data-cy="title">{`Task: ${title}`}</p>
        <p data-cy="status">
          {completed ? 'Status: Done' : 'Status: In progress'}
        </p>
      </div>
    </>
  );
};

export default TodoInfo;
