import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../interfaces/interfaces';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      key={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
