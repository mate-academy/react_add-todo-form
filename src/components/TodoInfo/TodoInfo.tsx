import { FC } from 'react';

import classNames from 'classnames';

import { UserInfo } from '../UserInfo';

import { ITodoInfo } from './TodoInfo.types';

export const TodoInfo: FC<ITodoInfo> = ({ todo }) => {
  return (
    <article
      data-id={+todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
