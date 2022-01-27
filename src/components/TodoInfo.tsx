import { UserInfo } from './UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <>
    <h2>
      {`task: ${todo.title}`}
    </h2>
    <h3>
      {`completed: ${todo.completed}`}
    </h3>
    {todo.user
    && <UserInfo user={todo.user} />}
  </>
);
