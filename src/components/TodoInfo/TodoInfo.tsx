import { UserInfo } from '../UserInfo';
import { UsersToDo } from '../../types/ToDo';

type Props = {
  todo: UsersToDo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const completedTask = todo.completed ? 'TodoInfo--completed' : '';

  return (
    <article
      className={`TodoInfo ${completedTask}`}
      data-id={todo.id}

    >
      <h2
        className="TodoInfo__title"
        // style={{ color: todo.completed || 'blue'}}
      >
        {todo.title}
      </h2>

      { todo.user
        ? <UserInfo user={todo.user} />
        : ''}
    </article>
  );
};
