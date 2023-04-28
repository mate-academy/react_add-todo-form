import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo,
  user: User | undefined,
};

export const TodoInfo: React.FC<Props> = ({ todo, user }) => {
  return (
    <section className="TodoList">
      <article
        data-id={todo.id}
        className={`TodoInfo TodoInfo--${todo.completed ? 'completed' : ''}`}
      >
        <h2 className="TodoInfo__title">
          {todo.title}
        </h2>

        <UserInfo user={user} />
      </article>
    </section>
  );
};
