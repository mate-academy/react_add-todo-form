import { Todo } from '../../types/types';
import { UserInfo } from '../UserInfo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Props) => {
  return (
    <>
      <article
        data-id={todo.id}
        className={classNames('TodoInfo', {
          'TodoInfo--completed': todo.completed,
        })}
      >
        <h2 className="TodoInfo__title">{todo.title}</h2>

        {todo.user && <UserInfo user={todo.user} />}
      </article>
    </>
  );
};
