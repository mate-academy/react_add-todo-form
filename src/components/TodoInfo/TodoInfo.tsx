import { UserInfo } from '../UserInfo';
import { Todos } from '../../types/TodosProps';

type TodoInfoProps = {
  todo: Todos
};

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  return (
    <article
      className={`TodoInfo ${todo.completed && 'TodoInfo--completed'}`}
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>
      {todo.user && (
        <UserInfo
          user={todo.user}
        />
      )}
    </article>
  );
};
