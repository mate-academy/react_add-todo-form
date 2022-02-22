import { FullTodo } from '../types/FullTodo';
import { UserInfo } from '../User.tsx/UserInfo';

type Props = {
  fullTodo : FullTodo
};

export const TodoInfo: React.FC<Props> = ({ fullTodo }) => (
  <>
    <h3 className="todo-info__title">
      {`Task: ${fullTodo.title}`}
    </h3>

    <h4>
      {`Status: ${fullTodo.completed ? 'completed' : 'not completed'}`}
    </h4>

    {fullTodo.user && <UserInfo user={fullTodo.user} /> }
  </>
);
