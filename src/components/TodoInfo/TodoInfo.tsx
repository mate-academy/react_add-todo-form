import { UserInfo } from '../UserInfo';
import { Todo } from '../../Types/Todo';
import './TodoInfo.scss';

type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Props) => {
  const { title, user } = todo;

  return (
    <>
      <article
        data-id={todo.id}
        className={todo.completed
          ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'}
      >
        <h2 className="TodoInfo__title">{title}</h2>
        {user !== null && <UserInfo user={user} />}
      </article>
    </>
  );
};
