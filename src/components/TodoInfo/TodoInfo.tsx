import { FC } from 'react';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/types';
import classNames from 'classnames';

type TodoInfoProps = {
  todo: Todo;
};

export const TodoInfo: FC<TodoInfoProps> = ({ todo }) => {
  return (
    <article
      className={classNames(
        `TodoInfo ${todo.completed && 'TodoInfo--completed'}`,
      )}
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
