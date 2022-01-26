import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: TodoWithUser;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <>
    <h2 className="todo__title">{todo.title}</h2>
    <UserInfo user={todo.user} />
    {todo.completed ? (
      <span className="todo__completed">Completed</span>
    ) : (
      <span className="todo__not-completed">Not completed</span>
    )}
  </>
);
