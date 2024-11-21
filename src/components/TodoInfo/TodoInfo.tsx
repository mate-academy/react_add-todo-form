import { Todo } from "../../types/Todo";
import { UserInfo } from "../UserInfo";
import cn from 'classnames';
import usersFromServer from '../../api/users';
interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {

  if (!Array.isArray(usersFromServer) || !usersFromServer.length) {
    throw new Error('Invalid data format');
  }

  const userObj = usersFromServer.find(user => user.id === todo.userId);
  const {id, completed = false, title  } = todo;

  return (
    <article data-id={id} className={cn('TodoInfo', {
      'TodoInfo--completed': completed,
    })}>
      <h2 className="TodoInfo__title">{title}</h2>

      {userObj && <UserInfo user={userObj} />}
    </article>
  )
};
