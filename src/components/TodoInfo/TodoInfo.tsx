import { UserInfo } from '../UserInfo';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC <Props> = ({ todo }) => (
  <>
    <h2 className="TodoInfo__title">{todo.title}</h2>
    {!!todo.user && <UserInfo user={todo.user} />}
  </>
);
