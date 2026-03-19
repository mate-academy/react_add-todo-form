import React from 'react';
import { Todo } from '../../api/todos';
import { UserInfo } from '../UserInfo'; // Імпортуємо сусідній компонент

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    data-id={todo.id}
    className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    {todo.user && <UserInfo user={todo.user} />}
  </article>
);
