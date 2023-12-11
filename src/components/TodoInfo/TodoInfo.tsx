import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';
import { getUserById } from '../../servises/user';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { completed, title } = todo;

  const user = getUserById(todo.userId);

  return (
    <article className={cn('TodoInfo', {
      'TodoInfo--completed': completed === true,
    })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>
      { user && (
        <UserInfo user={user} />
      ) }
    </article>
  );
};
