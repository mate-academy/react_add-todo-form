import { FC } from 'react';
import { PreparedTodos } from '../../appTypeDefs';
import { UserInfo } from '../UserInfo/UserInfo';

interface TodoInfoProps {
  todo: PreparedTodos
}

export const TodoInfo: FC<TodoInfoProps> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    user,
  } = todo;

  const todoStatus = completed
    ? 'Completed'
    : 'Pending';

  return (
    <tr>
      <td>{id}</td>
      <td data-cy="title">{title}</td>
      <td data-cy="status">{todoStatus}</td>
      <td>
        <UserInfo
          id={todo.id}
          name={user?.name || 'Unknown'}
          email={user?.email || 'Unknown'}
        />
      </td>
    </tr>
  );
};
