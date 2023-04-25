import { FC } from 'react';
import className from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: FC<Props> = ({ todo }) => {
  const {
    id,
    completed,
    title,
    user,
  } = todo;

  return (
    <article
      data-id={id}
      className={className('TodoInfo',
        { 'TodoInfo--completed': completed })}
      key={id}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {/* <a className="UserInfo" href={`mailto:${user?.email}`}>
        {user?.name}
      </a> */}
      {user && <UserInfo user={user} />}
    </article>
  );
};
