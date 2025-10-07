import React from 'react';
import { User } from '../../App'; // ✅ спільний тип

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  user: User;
}

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => (
  <article
    className={`TodoInfo${todo.completed ? ' TodoInfo--completed' : ''}`}
    data-id={todo.id}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    {/* ✅ без optional chaining — user гарантовано є */}
    <a className="UserInfo" href={`mailto:${todo.user.email}`}>
      {todo.user.name}
    </a>
  </article>
);
