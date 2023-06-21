import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

export const TodoInfo:React.FC<{ todo: Todo }> = ({ todo }) => {
  const userInfo = todo.user && <UserInfo user={todo.user} />;
  const todoInfoClasses = `TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`;

  return (
    <article className={todoInfoClasses}>
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {userInfo}
    </article>
  );
};
