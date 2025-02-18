import classNames from 'classnames';
import { Todo } from '../../types/types';
import { UserInfo } from '../UserInfo';
import users from '../../api/users';
import { defaultCreator } from '../../utils/defaultCreator';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed, creator, userId } = todo;
  const clearUser =
    creator || users.find(user => user.id === userId) || defaultCreator;

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={clearUser} />
    </article>
  );
};
