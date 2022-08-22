import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo:Todo;
  users: User[]
};

export const TodoInfo:React.FC<Props> = ({ todo, users }) => {
  const {
    id,
    title,
    completed,
    userId,
  } = todo;

  const user = users.find(people => people.id === userId) || null;

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title" data-cy={title}>
        {title}
      </h2>
      <UserInfo user={user} />
    </article>
  );
};
