import React from 'react';

import { UserInfo } from '../UserInfo';

type Props = {
  completed: boolean,
  title: string,
  todoId: number,
  userId: number,
};

export const TodoInfo: React.FC<Props> = ({
  completed, title, todoId, userId,
}) => (
  <article
    data-id={todoId}
    className={`TodoInfo ${completed && 'TodoInfo--completed'}`}
  >
    <h2 className="TodoInfo__title">{title}</h2>

    <UserInfo userId={userId} />
  </article>
);
