import { ReactElement } from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types';

export const TodoList = ({ todos }: { todos: Todo[] }): ReactElement => {
  return (
    <section className="TodoList">
      {todos.map((todo: Todo) => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
