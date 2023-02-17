/* eslint-disable no-console */
import classNames from 'classnames';
import { Todo } from '../../types/TodoType';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
  largestId: number;
};

export const TodoInfo: React.FC<Props> = ({ todo, largestId }) => {
  return (
    <article
      data-id={largestId + 1}
      className={classNames(
        'TodoInfo',
        { 'TodoInfo--completed': todo.completed },
      )}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {todo.user && <UserInfo key={todo.user.id} user={todo.user} />}
    </article>
  );
};
