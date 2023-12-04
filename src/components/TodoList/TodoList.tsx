import { Fragment } from 'react';
import { Todo } from '../../type/Todo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <Fragment key={todo.id}>
          <TodoInfo todo={todo} />
        </Fragment>
      ))}
    </section>
  );
};
