import classNames from 'classnames';
import { FullTodo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: FullTodo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, completed, title } = todo;

  return (
    <article
      data-id={id}
      key={id}
      className={classNames(
        'TodoInfo',
        {
          'TodoInfo--completed': completed,
        },
      )}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {todo.user && (
        <UserInfo user={todo.user} />
      )}
    </article>
  );
};
