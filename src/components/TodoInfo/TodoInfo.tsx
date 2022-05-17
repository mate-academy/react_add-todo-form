import React, { useState } from 'react';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';

import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const [completed, setCompleted] = useState(false);

  const changeComplete = () => {
    setCompleted((prev) => !prev);
  };

  return (
    <label>
      <li
        className={classNames(
          'list__item',
          { 'list__item--compl': completed },
        )}
      >
        <h2 className="todo-info__title">{todo.title}</h2>
        {todo.user && (
          <UserInfo user={todo.user} />
        )}
        <div className="todo-info__check" />
        <button
          type="button"
          onClick={changeComplete}
          className="list__item__button"
        >
          {completed ? 'Completed' : 'In progress'}
        </button>
      </li>
    </label>

  );
};
