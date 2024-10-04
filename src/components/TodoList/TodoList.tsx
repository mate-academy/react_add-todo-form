import { FC } from 'react';

import { TodoWithUser } from '../../types/Todo';

import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: TodoWithUser[];
}

export const TodoList: FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
