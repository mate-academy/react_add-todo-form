import classNames from 'classnames';
import { Todo } from '../Interfaces';
import usersFromServer from '../../api/users';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Props) => {
  const author = usersFromServer.find(user => user.id === todo.userId);

  if (!author) {
    return null;
  }

  return (
    <article
      data-id={todo.id}
      key={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={author} />
    </article>
  );
};
