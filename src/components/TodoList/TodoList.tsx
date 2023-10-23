import { FC } from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
}

export const TodoList: FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => {
      return (
        <TodoInfo
          key={todo.id}
          todo={todo}
        />
      );
    })}
  </section>
);
