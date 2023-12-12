import { Todo } from '../../type/Todo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Props) => {
  const {
    id,
    title,
    user,
    completed,
  } = todo;

  return (
    <article data-id={id} className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}>
      <h2 className="TodoInfo__title">
        {title}
      </h2>
      {user && (
        <UserInfo user={user} />
      )}
    </article>
  );
};
