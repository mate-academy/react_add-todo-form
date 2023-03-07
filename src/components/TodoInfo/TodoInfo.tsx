import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo,
};

export const TodoInfo:React.FC<Props> = ({ todo }) => {
  const { title, user } = todo;

  return (
    <>
      <h2 className="TodoInfo__title">{title}</h2>

      {user && (<UserInfo user={user} />)}
    </>
  );
};
