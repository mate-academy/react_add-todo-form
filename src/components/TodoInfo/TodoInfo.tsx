import { UserInfo } from '../UserInfo';
import { Todo, User } from '../../types/types';

type Props = {
  todos: Todo[];
  users: User[];
};

export const TodoInfo = ({ todos, users }: Props) => {
  return (
    <>
      {todos.map(todo => {
        const USER = users.find(user => user.id === todo.userId);

        return (
          <article key={todo.id} className="TodoInfo TodoInfo--completed">
            <h2 className="TodoInfo__title">{todo.title}</h2>

            {USER && <UserInfo user={USER} />}
          </article>
        );
      })}
    </>
  );
};
