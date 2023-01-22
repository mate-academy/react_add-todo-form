import React, { memo } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = memo(({ todo }) => (
  <article
    data-id={todo.id}
    className={classNames(
      'TodoInfo',
      { 'TodoInfo--completed bg-success': todo.completed },
    )}
  >
    <h2 className="TodoInfo__title">{ todo.title }</h2>

    {todo.user && (
      <UserInfo user={todo.user} />
    )}
  </article>
));
