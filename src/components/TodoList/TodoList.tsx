import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[],
};

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(({
        id,
        title,
        userId,
        completed,
      }) => (
        <TodoInfo
          key={id}
          id={id}
          title={title}
          userId={userId}
          completed={completed}
        />
      ))}
    </section>
  );
};
