import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface Props {
  info: Todo,
}

export const TodoInfo = ({ info }: Props) => {
  const {
    id,
    completed,
    title,
    user,
  } = info;

  return (
    <article data-id={id} className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}>
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
