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
        <p data-cy="titleInput">{`Task: ${title}`}</p>
        <p>
          {completed ? 'Status: Done' : 'Status: In progress'}
        </p>
      </div>
    </>
  );
};

export default TodoInfo;
