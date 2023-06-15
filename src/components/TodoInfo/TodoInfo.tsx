import classNames from 'classnames';
import { User } from '../../types/User';
import { UserInfo } from '../UserInfo';

type Props = {
  id: number,
  title: string,
  completed: boolean,
  user: User | null,
};

export const TodoInfo:React.FC<Props> = ({
  id,
  title,
  completed,
  user,
}) => {
  return (
    <article
      data-id={id}
      className={classNames(
        'TodoInfo',
        {
          'TodoInfo--completed': completed,
        },
      )}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && (
        <UserInfo name={user.name} email={user.email} />
      )}
    </article>
  );
};
