/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { FC, useState } from 'react';

import cn from 'classnames';
import { Todo } from '../../react-app-env';
import { UserInfo } from '../UserInfo';

import completedIcon from '../../img/completed.png';

type Props = {
  todo: Todo
};

export const TodoInfo: FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    description,
    completed,
    user,
  } = todo;

  const [isTodoCompleted, setIsTodoCompleted] = useState(completed);

  return (
    <article
      data-id={id}
      className={
        cn('TodoInfo', { 'TodoInfo--completed': isTodoCompleted })
      }
    >
      <h2 className="TodoInfo__title">
        {title.toUpperCase()}
      </h2>

      <p className="TodoInfo__description">
        {description}
      </p>

      {
        user && (<UserInfo user={user} />)
      }

      <img
        key={id}
        src={completedIcon}
        alt="Completed icon"
        className="TodoInfo__img"
        onClick={() => setIsTodoCompleted(!isTodoCompleted)}
      />
    </article>
  );
};
