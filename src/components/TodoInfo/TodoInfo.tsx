import { FC } from 'react';

import cn from 'classnames';
import { Todo } from '../../react-app-env';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo
};

export const TodoInfo: FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    user,
  } = todo;

  const isUserExist = !!user;

  return (
    <article
      data-id={id}
      className={
        cn('TodoInfo', { 'TodoInfo--completed': completed })
      }
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {
        isUserExist && (<UserInfo user={user} />)
      }
    </article>
  );
};
