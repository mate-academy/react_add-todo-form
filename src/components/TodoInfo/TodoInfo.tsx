import { UserInfo } from '../UserInfo/UserInfo';

type Props = { todo: Todo };

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">
        <p>{todo.title}</p>
        <p>{todo.completed}</p>
      </h2>
      <UserInfo user={todo.user} />
    </article>
  );
};
