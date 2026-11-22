import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo = (props: Props) => {
  const { todo } = props;

  return (
    <>
      <article
        data-id={todo.id}
        className={classNames(
          'TodoInfo',
          'bg-white shadow rounded px-4 py-3',
          'flex flex-col gap-1',
          { 'TodoInfo--completed': todo.completed },
        )}
      >
        <h2 className="TodoInfo__title">{todo.title}</h2>

        <UserInfo user={todo.user} />
      </article>
    </>
  );
};
