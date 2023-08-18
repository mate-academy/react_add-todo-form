import cn from 'classnames';
import users from '../../api/users';
import { UserInfo } from '../UserInfo';

interface Props {
  title: string,
  userId: number,
  id: number,
  completed: boolean,
}

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}

function getUserById(arr: User[], id: number): User | null {
  return arr.find(item => item.id === id) || null;
}

export const TodoInfo: React.FC<Props> = ({
  id,
  userId,
  title,
  completed,
}) => {
  const user = getUserById(users, userId);
  const email = user?.email;
  const name = user?.name;

  return (
    <section
      className="TodoList"
    >
      <article
        data-id={id}
        className={cn('TodoInfo', {
          'TodoInfo--completed': completed,
        })}
      >
        <h2 className="TodoInfo__title">
          {title}
        </h2>

        {/* <UserInfo email={email} name={name} /> */}
        {user && <UserInfo email={email} name={name} />}
      </article>
    </section>
  );
};
