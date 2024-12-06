import { FC } from 'react';
import { Todo } from '../../api/todos';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
}

export const TodoList: FC<Props> = props => {
  const { todos } = props;

  return (
    <section className="TodoList">
      {todos.map((todo: Todo): JSX.Element => {
        return <TodoInfo todo={todo} key={todo.id} />;
      })}
    </section>
  );
};
