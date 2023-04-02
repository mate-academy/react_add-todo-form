import React from 'react';

import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <h2 className="TodoInfo__title">{todo.title}</h2>
);
