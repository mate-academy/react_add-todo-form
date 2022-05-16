import React, { useState } from 'react';
import { Todo } from '../Types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const [isChecked, setChecked] = useState(todo.completed);

  const checkBox = () => {
    setChecked(!isChecked);
  };

  return (
    <>
      <h2 className="todo__info-title">
        {todo.title}
      </h2>
      <span>Completed: </span>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={checkBox}
      />
      {todo.user && <UserInfo user={todo.user} />}
    </>
  );
};
