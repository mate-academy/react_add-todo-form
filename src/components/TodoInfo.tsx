import { Todo } from '../types/Todo';

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    userId,
    id,
    title,
    completed,
  } = todo;

  return (
    <>
      <h3>{title}</h3>
      <p className="info">
        User ID:
        {userId}
        <br />
        {id}
        <br />
        {completed
          ? (
            'Task is completed'
          )
          : (
            'Task is not completed'
          )}
      </p>
    </>
  );
};

type Props = {
  todo: Todo
};
