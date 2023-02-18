import { FC } from 'react';
import classNames from 'classnames';

import { UserInfo } from '../UserInfo';

import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: FC<Props> = ({
  todo: {
    id,
    title,
    user,
    completed,
  },
}) => (
  <article
    className={classNames('TodoInfo', {
      'TodoInfo--completed': completed,
    })}
    data-id={id}
  >
    <h2 className="TodoInfo__title">{title}</h2>
    {user && <UserInfo user={user} />}
  </article>
);
