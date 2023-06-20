import { FC } from 'react';
import className from 'classnames';
import { Todo } from '../../tipes';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo,
};

export const TodoInfo: FC<Props> = ({ todo }) => {
  const { title, completed, user } = todo;

  return (
    <article
      className={className('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <UserInfo user={user} />
    </article>
  );
};
