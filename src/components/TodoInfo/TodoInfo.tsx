import React from 'react';

import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    className={`TodoInfo data-id=${todo.id} ${todo.completed && 'TodoInfo--completed'}`}
    key={todo.id}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>
    <UserInfo todo={todo} />
  </article>

);
