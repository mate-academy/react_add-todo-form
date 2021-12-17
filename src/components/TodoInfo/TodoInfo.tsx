import './TodoInfo.scss';
import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../types/Todo';

type Props = Pick<Todo, 'title' | 'completed' | 'user'>;
export const TodoInfo: React.FC<Props> = (todo) => (
  <>
    <h2>{todo.title}</h2>
    <p>
      {todo.completed
        ? (<span className="completed">Completed</span>)
        : (<span className="pending">Pending</span>)}
    </p>
    {todo.user && (
      <UserInfo user={todo.user} />
    )}
  </>
);
