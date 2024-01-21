import { UserInfo } from '../UserInfo/UserInfo';
import { ToDoWithUserProps } from '../types';

export const TodoInfo: React.FC<ToDoWithUserProps> = (
  { todo },
) => {
  return (
    <div>
      <article data-id={todo.id} className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : null}`}>
        <h2 className="TodoInfo__title">
          {todo.title}
        </h2>

        {todo.user && <UserInfo user={todo.user} />}
      </article>
    </div>
  );
};
