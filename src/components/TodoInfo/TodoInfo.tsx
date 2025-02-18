import { UserInfo } from '../UserInfo/UserInfo';
import users from '../../api/users';
import { ITodos } from '../TodoList';

export const TodoInfo = ({ todo }: { todo: ITodos }) => {
  return (
    <article
      data-id={todo.id}
      className={`${todo.completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {users
        .filter(user => todo.userId === user.id)
        .map(user => (
          <UserInfo key={user.email} user={user} />
        ))}
    </article>
  );
};
