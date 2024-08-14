import { FC } from 'react';
import { NewTodo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import cn from 'classnames';

type TodoInfoProps = {
  todo: NewTodo;
};

export const TodoInfo: FC<TodoInfoProps> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
