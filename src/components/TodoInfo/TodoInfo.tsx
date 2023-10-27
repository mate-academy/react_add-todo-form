import React from 'react';
import { UserInfo } from '../UserInfo';

import { Todo } from '../../types/ToDo';

type Props = {
  todo: Todo;
};
// Add the required props
export const TodoInfo:React.FC<Props> = ({ todo }) => (
  <article className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}>
    <h2 className="TodoInfo__title">{todo.title}</h2>
    <UserInfo user={todo.user} />
  </article>
);
