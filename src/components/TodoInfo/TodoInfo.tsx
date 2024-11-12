import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo;
  user: User | null;
};

export const TodoInfo: React.FC<Props> = ({
  todo: { completed, title, id },
  user,
}) => (
  <article className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}>
    <h2 className="TodoInfo__title" data-id={id ?? 0}>
      {title}
    </h2>
    <UserInfo user={user} />
  </article>
);
