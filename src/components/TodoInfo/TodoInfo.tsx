import { Todo } from '../../type';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <div data-id={todo.id}>
    <p>
      {todo.id}
    </p>
    <p>
      {todo.title}
    </p>

    {todo.completed
      ? (
        <p className="completed">
          Completed
        </p>
      )

      : (
        <p className="notCompleted">
          Not completed
        </p>
      )}
  </div>
);
