import cn from 'classnames';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const todoUser = usersFromServer.find(user => user.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo Todo__item box', {
        'TodoInfo--completed has-background-primary-light': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title subtitle">
        {todo.title}
      </h2>

      {todoUser && (
        <UserInfo user={todoUser} />
      )}
    </article>
  );
};
