import { UserInfo } from './UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <>
    <b>
      {`task: ${todo.title}`}
    </b>
    <br />
    <span>
      {`completed: ${todo.completed}`}
    </span>
    <br />
    {todo.user && <UserInfo user={todo.user} />}
  </>
);
