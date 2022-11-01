import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoInfo = ({ todo }: Props) => {
  const {
    id, title, completed, userId,
  } = todo;

  return (
    <article
      data-id={id}
      className={`TodoInfo ${completed && 'TodoInfo--completed'}`}
      key={id}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <UserInfo userId={userId} />
    </article>
  );
};
