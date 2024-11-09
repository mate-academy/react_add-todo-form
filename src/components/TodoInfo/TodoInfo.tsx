import { UserInfo } from '../UserInfo';
// import usersFromServer from './api/users';

export const TodoInfo = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} key={todo.userId} />
    </article>
  );
};
