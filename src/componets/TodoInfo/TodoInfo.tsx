import { TodoWithUser } from '../../types/typesdef';
import './TodoInfo.scss';

interface Props {
  todo: TodoWithUser
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, user } = todo;

  return (
    <>
      <h2 className="todo-info__title">{`${id}. ${title}`}</h2>

      {user && (
        <p>
          {`User: ${user.name}`}
        </p>
      )}
    </>
  );
};
