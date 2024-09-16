import { UserInfo } from '../UserInfo';
import { Todo } from '../../Types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { completed, user, title, id } = todo;

  return (
    <article
      className={completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'}
      data-id={id}
    >
      <h2 className="TodoInfo__title" data-id={id}>
        {title}
      </h2>
      <UserInfo user={user} />
    </article>
  );
};
