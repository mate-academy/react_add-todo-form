import React from 'react';
import { UserInfo } from '../UserInfo';
import Todo from '../../types/Todo';
import User from '../../types/User';

type Props = {
  todo: Todo & { user: User };
  onToggle?: () => void; // Prop opcional para manter compatibilidade
};

export const TodoInfo: React.FC<Props> = ({ todo, onToggle }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      {onToggle && (
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
          className="TodoInfo__checkbox"
        />
      )}
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo.user} />
    </article>
  );
};
