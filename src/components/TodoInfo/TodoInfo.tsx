import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface Props {
  todos: Todo[];
  users: User[];
}

export const TodoInfo: React.FC<Props> = ({ todos, users }) => {
  const getUserById = (id: number): User | undefined => {
    return users.find(user => user.id === id);
  };

  return (
    <div>
      {todos.map(todo => {
        const user = getUserById(todo.userId);

        return (
          <article
            key={todo.id}
            className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
          >
            <h2 className="TodoInfo__title">{todo.title}</h2>

            {user && <UserInfo user={user} />}
          </article>
        );
      })}
    </div>
  );
};
