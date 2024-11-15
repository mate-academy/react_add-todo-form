import React from "react";
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface Props {
  todo: Todo;
  user?: User; 
}

export const TodoInfo: React.FC<Props> = ({ todo, user }) => {
  const { title, completed } = todo;

  return (
    <article className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}>
      <h2 className="TodoInfo__title">{title}</h2>
      {user ? (
        <a className="UserInfo" href={`mailto:${user.email}`}>
          {user.name}
        </a>
      ) : (
        <span className="UserInfo">Unknown User</span>
      )}
    </article>
  );
};
