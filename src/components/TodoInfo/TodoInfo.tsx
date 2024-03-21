import { Todo } from '../../type/Todo';
import React from 'react';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({
  todo: { completed, title, user, id },
}) => (
  <article
    data-id={id}
    className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}
  >
    <h2 className="TodoInfo__title">{title}</h2>

    {user && <UserInfo user={user} />}
  </article>
);
