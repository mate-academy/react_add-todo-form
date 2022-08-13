import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';

import { Task } from '../../types/Task';

type Props = {
  tasks: Task[],
};

export const TodoList: React.FC<Props> = (props) => {
  const { tasks } = props;

  return (
    <section className="TodoList">
      {tasks.map(task => (
        <TodoInfo task={task} key={task.id} />
      ))}
    </section>
  );
};
