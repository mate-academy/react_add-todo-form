import { UserInfo } from '../UserInfo';
import { Todos } from '../../Types/Todos';

type Props = {
  todo: Todos;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, id, user } = todo;

  return (
    <article data-id={id} className="TodoInfo TodoInfo--completed">
      <h2 className="TodoInfo__title">{title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
