import React from 'react';

import { Todo } from '../api/todo';

type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <>
    <p>{` Todo title: ${todo.title}`}</p>
    <p>{` Todo compelted: ${todo.completed}`}</p>
  </>
);
