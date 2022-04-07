import { Todo } from '../types';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    userId,
    id,
    title,
    completed,
  } = todo;

  return (
    <>
      <h2>{title}</h2>
      <p>
        User ID:
        {userId}
      </p>
      <p>
        {id}
      </p>
      <p>
        {completed
          ? (
            'Completed'
          )
          : (
            'Not completed'
          )}
      </p>
    </>
  );
};
