import { FC } from 'react';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import './TodoInfo.scss';
import { FullTodo } from '../../react-app-env';

type Props = {
  todo: FullTodo;
};

export const TodoInfo: FC<Props> = ({
  todo: {
    title,
    completed,
    user,
    id,
  },
}) => (
  <article
    data-id={id}
    className={classNames(
      'TodoInfo',
      {
        'TodoInfo--completed': completed,
      },
    )}
  >
    <h2 className="TodoInfo__title">{title}</h2>

    {user && <UserInfo user={user} />}
  </article>
);
