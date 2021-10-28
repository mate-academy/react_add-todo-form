import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <div>
      <p>
        <b>Title:</b>
        {' '}
        {todo.title}
      </p>
      {' '}
      {todo.completed
        ? <p>complited</p>
        : <p>in progres</p>}
    </div>
  );
};
