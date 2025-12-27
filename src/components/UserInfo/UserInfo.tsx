import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const UserInfo: React.FC<Props> = ({ todo }) => {
  return (
    <a className="UserInfo" href={`mailto:${todo.user?.email}`}>
      {todo.user?.name}
    </a>
  );
};
