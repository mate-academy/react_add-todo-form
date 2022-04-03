import React, { useState } from 'react';
import { UserInfo } from '../UserInfo';

import { Todo } from '../../types/types';
import users from '../../api/users';

type Props = Todo;

export const TodoInfo: React.FC<Props> = ({
  userId, title, completed,
}) => {
  const [checked, setChecked] = useState(completed);

  const user = users.find(({ id }) => userId === id);

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="todo-info" data-check={checked}>
      <div className="todo-info__task">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleClick}
        />

        <p className="todo-info__title">
          {title}
        </p>
      </div>

      {user && (
        <UserInfo
          name={user.name}
          email={user.email}
          website={user.website}
        />
      )}
    </div>
  );
};
