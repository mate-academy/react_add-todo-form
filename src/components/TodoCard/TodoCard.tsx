import classNames from 'classnames';
import { FC, useState } from 'react';

import './TodoCard.scss';

type Props = {
  id: number,
  title: string,
  userName: string,
  completed: boolean,
};

export const TodoCard: FC<Props> = ({
  id, title, userName, completed,
}) => {
  const [isCompleted, setCompleted] = useState(completed);

  return (
    <div
      className={classNames({
        TodoCard: true,
        'TodoCard--completed': isCompleted,
      })}
    >
      <input
        type="checkbox"
        id={`isDone${id}`}
        className="TodoCard__completedToggler"
        checked={isCompleted}
        onChange={({ target }) => setCompleted(target.checked)}
      />

      <label
        htmlFor={`isDone${id}`}
        className="TodoCard__hint"
      >
        Click on card to swithc
      </label>

      <hr className="TodoCard__strip" />

      <p className="TodoCard__title">
        {title}
      </p>

      <p className="TodoCard__userName">
        {userName}
      </p>
    </div>
  );
};
