import React from 'react';
import { Todo } from '../../props/todoProps';
import { User } from '../../props/userProps';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo,
  users: User[],
};

export const TodoInfo: React.FC<Props> = ({ todo, users }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <UserInfo
        todo={todo}
        users={users}
      />
    </article>
  );
};
