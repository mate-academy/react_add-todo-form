import cn from 'classnames';
import usersFromServer from '../../api/users';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../type/Todo';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({
  todo: { id, title, completed, userId },
}) => {
  const todoAuthor = usersFromServer.find(user => user.id === userId) || null;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {todoAuthor && <UserInfo user={todoAuthor} />}
    </article>
  );
};
