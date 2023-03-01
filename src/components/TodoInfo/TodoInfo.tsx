import classNames from 'classnames';
import './TodoInfo.scss';
import { useState } from 'react';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    userId,
    completed,
    user,
  } = todo;

  const [isCompleted, setCompleted] = useState(false);

  const handleToggle = () => {
    setCompleted(!isCompleted);
  };

  return (
    <li
      data-id={id}
      className={
        classNames(
          'TodoInfo',
          {
            'TodoInfo--completed': completed || isCompleted,
          },
        )
      }
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && <UserInfo key={userId} user={user} />}

      <button
        type="submit"
        className="TodoInfo__toggle"
        onClick={handleToggle}
      >
        Completed
      </button>
    </li>
  );
};
