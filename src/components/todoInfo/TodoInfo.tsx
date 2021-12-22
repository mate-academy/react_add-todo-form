import { Todo } from '../../types/Todo';
import { UserInfo } from '../userInfo/UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: Todo;
};

export const TodoInfo:React.FC<Props> = ({ todo }) => (
  <>
    {todo.user ? <UserInfo user={todo.user} /> : 'User not found'}
    <span>{todo.title}</span>
    <span>{todo.completed ? 'Completed' : 'In progres...'}</span>
  </>
);
