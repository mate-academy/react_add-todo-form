import cn from 'classnames';
import { useState } from 'react';

import { UserInfo } from '../UserInfo';

import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({
  todo: {
    id,
    completed,
    title,
    user,
  },
}) => {
  const [todoId] = useState({ 'data-id': id });

  return (
    <article
      {...todoId}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>
      <UserInfo user={user} />
    </article>
  );
};
