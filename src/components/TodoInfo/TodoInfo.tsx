import { FC } from 'react';
import { UserInfo } from '../UserInfo';
import classNames from 'classnames';
import { Prop } from '../types';

export const TodoInfo: FC<Prop> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
