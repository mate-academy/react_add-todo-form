import cn from 'classnames';
import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';

import { Task } from '../../types/Task';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  tasks: Task[],
};

export const TodoList: React.FC<Props> = (props) => {
  const { tasks } = props;

  return (
    <section className="TodoList">
      {tasks.map(task => (
        <article
          key={task.id}
          data-id={task.id}
          className={cn('TodoInfo',
            { 'TodoInfo--completed': task.completed })}
        >
          <TodoInfo title={task.title} />
          <UserInfo user={task.user} />
        </article>
      ))}
    </section>
  );
};
