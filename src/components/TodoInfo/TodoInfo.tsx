import UserInfo from '../UserInfo/UserInfo';
import { User, Todo } from '../../types';

interface TodoInfoProps {
  todo: Todo;
  user?: User;
}

export default function TodoInfo({ todo, user }: TodoInfoProps) {
  return (
    <article data-id={todo.id} className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}>
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={user} />
    </article>
  );
}
