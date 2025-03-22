import { Todo } from '../../types/todo';
import { UserInfo } from '../UserInfo';

type Props = { todo: Todo };

export const TodoInfo: React.FC<Props> = ({
  todo: { id, completed, title, user },
}) => (
  <article
    data-id={id}
    className={`TodoInfo ${completed && 'TodoInfo--completed'}`}
  >
    <h2 className="TodoInfo__title">{title}</h2>
    <UserInfo user={user} />
  </article>
);
