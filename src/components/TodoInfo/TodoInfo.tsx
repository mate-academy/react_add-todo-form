import cn from 'classnames';
import { UserInfo } from '../UserInfo';

interface Todos {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface Users {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Props {
  todos: Todos[];
  usersFromServer: Users[];
}

export const TodoInfo: React.FC<Props> = ({ todos, usersFromServer }) => {
  return (
    <>
      {todos.map(todo => (
        <article
          data-id={todo.id}
          key={todo.id}
          className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
        >
          <h2 className="TodoInfo__title">{todo.title}</h2>

          <UserInfo usersFromServer={usersFromServer} userId={todo.userId} />
        </article>
      ))}
    </>
  );
};
