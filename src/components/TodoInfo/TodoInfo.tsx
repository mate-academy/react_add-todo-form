import { FC } from 'react';
import classNames from 'classnames';
import { TodoFullInfo } from '../../types/todoFullInfo';
import { UserInfo } from '../UserInfo';

type TodoProps = {
  todo: TodoFullInfo,
};

export const TodoInfo: FC<TodoProps> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames(
        'TodoInfo',
        {
          'TodoInfo--completed': todo.completed,
        },
      )}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {todo.user
        ? (<UserInfo user={todo.user} />)
        : ('unknown user')}

    </article>
  );
};
