import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
}

export const TodoInfo = ({ todo }: Props) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user ? (
        <UserInfo user={todo.user} />
      ) : (
        <span className="UserInfo">None</span>
      )}
    </article>
  );
};
