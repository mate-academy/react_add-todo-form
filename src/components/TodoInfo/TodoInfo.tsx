import Todo from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo,
}

export const TodoInfo: React.FC<Props> = ({
  todo: {
    id,
    title,
    user,
    completed,
  },
}) => {
  return (
    <article
      data-id={id}
      className={`TodoInfo ${completed && 'TodoInfo--completed'}`}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <p>
        Id:
        {id}
      </p>

      {user && <UserInfo user={user} />}
    </article>
  );
};
