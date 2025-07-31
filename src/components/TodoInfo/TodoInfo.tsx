import classNames from 'classnames';
import { User } from '../../types/User';
import { UserInfo } from '../UserInfo';

type Props = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User;
};

export const TodoInfo: React.FC<Props> = ({ id, title, completed, user }) => {
  if (!user) {
    return null;
  }

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo
        id={user.id}
        name={user.name}
        username={user.username}
        email={user.email}
      />
    </article>
  );
};
