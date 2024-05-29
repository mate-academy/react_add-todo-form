import './TodoInfo.scss';
import { UserInfo } from '../UserInfo';
import { TodoWithUsers } from '../../types';

interface Props {
  todo: TodoWithUsers;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, user, completed, id } = todo;

  return (
    <article
      data-id={id}
      className={`TodoInfo ${completed && 'TodoInfo--completed'}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {user && <UserInfo user={user} key={user.id} />}
    </article>
  );
};
