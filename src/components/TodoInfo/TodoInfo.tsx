import React from 'react';
import { UserInfo } from '../UserInfo';

type Props = {
  todoItem: Todo;
};

export const TodoInfo: React.FC<Props> = (props) => {
  const { todoItem } = props;
  const { title, completed, user } = todoItem;

  return (
    <>
      <span>
        {`Task: ${title}. `}
      </span>
      {user && (
        <UserInfo user={user} />
      )}
      {completed && (
        <span className="float-right">
          Done
        </span>
      )}
    </>
  );
};
