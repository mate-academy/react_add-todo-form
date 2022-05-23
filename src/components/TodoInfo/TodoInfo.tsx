import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  task: Todo
};

export const TodoInfo: React.FC<Props> = ({ task }) => {
  const [status, setStatus] = useState(task.completed);

  return (
    <>
      <h2 className="task__title">
        {task.title}
      </h2>

      <input
        type="checkbox"
        checked={status}
        className="task__completed"
        onChange={() => setStatus(!status)}
      />
    </>
  );
};
