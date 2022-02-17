import { PreparedTodo } from '../../types/PreparedTodo';
import UserInfo from '../UserInfo/UserInfo';

type Props = {
  preparedTodo: PreparedTodo;
};

const TodoInfo: React.FC<Props> = ({ preparedTodo }) => {
  const { title, completed, user } = preparedTodo;

  return (
    <>
      <h2>{title}</h2>
      <h3>
        {
          `Completed : ${completed
            ? 'yes'
            : 'no'}`
        }
      </h3>
      {user && <UserInfo user={user} />}
    </>
  );
};

export default TodoInfo;
