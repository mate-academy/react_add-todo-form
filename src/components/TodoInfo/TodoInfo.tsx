import cn from 'classnames';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed, userId } = todo;
  const currentUser = usersFromServer.find(user => user.id === userId);

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {currentUser && <UserInfo currentUser={currentUser} />}
    </article>
  );
};
