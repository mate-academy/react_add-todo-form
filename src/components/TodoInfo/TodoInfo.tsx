import React from 'react';
import { UserInfo } from '../UserInfo';
// import { Todo } from '../../App';
import { EnrichedTodo } from '../TodoList';

type Props = {
  todo: EnrichedTodo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
