import { FC } from 'react';
import cn from 'classnames';

import { ITodo } from '../../types/Todo';

import { UserInfo } from '../UserInfo';

type ITodoInfo = {
  todo: ITodo
};

export const TodoInfo: FC<ITodoInfo> = ({ todo }) => (
  <article
    data-id="1"
    className={cn('TodoInfo', {
      'TodoInfo--completed': todo.completed,
    })}
  >
    <h2 className="TodoInfo__title">
      {todo.title}
    </h2>

    <UserInfo user={todo.user} />
  </article>
);
