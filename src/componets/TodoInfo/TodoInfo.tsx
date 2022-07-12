import { TodoWithUser } from '../../types/typesdef';
import './TodoInfo.scss';

interface Props {
  todo: TodoWithUser
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, user } = todo;

  return (
    <>
      <p>{`Todo ID: #${id}`}</p>
      <h2 className="todo-info__title">{title}</h2>

      {user && (
        <p>
          {`User: ${user.name}`}
        </p>
      )}
    </>
  );
};
