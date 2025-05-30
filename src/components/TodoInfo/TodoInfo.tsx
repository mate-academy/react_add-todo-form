import { FC } from 'react';
import { Todo } from '../../entities/todo/Todo';
import { UserInfo } from '../UserInfo';

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo: FC<TodoInfoProps> = ({ todo }) => (
  <article
    key={todo.id}
    data-id={todo.id}
    className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    {todo.user && <UserInfo user={todo.user} />}
  </article>
);
