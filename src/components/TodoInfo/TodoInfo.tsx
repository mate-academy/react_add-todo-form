import cn from 'classnames';
import { Todo } from '../../type/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, user } = todo;

  return (
    <article
      key={id}
      data-id={id}
      className={cn('TodoInfo',
        { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <UserInfo user={user} />
    </article>
  );
};
