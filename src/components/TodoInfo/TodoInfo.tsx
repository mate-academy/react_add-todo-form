import classNames from 'classnames';
import { UserInfo } from '../UserInfo';

interface User {
  id: number,
  name: string,
  username:string,
  email: string,
}

interface Todos {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user?: User | null
}

type Props = {
  todo: Todos
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    user,
    title,
    completed,
  } = todo;

  return (
    <article
      className={
        classNames('TodoInfo', { 'TodoInfo--completed': completed })
      }
      data-id={id}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
