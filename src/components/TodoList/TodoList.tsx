import { FC } from 'react';

import { TodoInfo } from '../TodoInfo';

import { TodoWithUser } from '../../types';

type Props = {
  todos: TodoWithUser[];
};

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {
        todos.map((todo: TodoWithUser) => (
          <TodoInfo todo={todo} key={todo.id} />
        ))
      }
    </section>
  );
};
