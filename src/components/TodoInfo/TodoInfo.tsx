import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Types';

type Props = {
  todo: Todo,
  index: number,
};

export const TodoInfo = ({ todo, index }: Props) => {
  return (
    <article
      data-id={index}
      className={classNames(
        'TodoInfo',
        { 'TodoInfo--completed': todo.completed },
      )}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
