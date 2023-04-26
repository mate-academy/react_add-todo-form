import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    user,
  } = todo;
  const isComplited = completed ? 'TodoInfo--completed' : 'TodoInfo';

  return (
    <article
      data-id={id}
      className={isComplited}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <a className="UserInfo" href={user.email}>
        {user && <UserInfo user={user} />}
      </a>
    </article>
  );
};
