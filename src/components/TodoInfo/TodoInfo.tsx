import { FC } from 'react';
import { Todo } from '../../types';
import { UserInfo } from '../UserInfo';
import cn from 'classnames';

interface Props {
  todo: Todo;
};

export const TodoInfo: FC<Props> = ({ todo }) => (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
);



