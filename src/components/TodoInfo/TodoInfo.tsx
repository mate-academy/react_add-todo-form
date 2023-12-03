import Todo from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo,
}

export const TodoInfo: React.FC<Props> = ({
  todo: {
    id,
    title,
    userId,
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

      <UserInfo userId={userId} />
    </article>
  );
};
