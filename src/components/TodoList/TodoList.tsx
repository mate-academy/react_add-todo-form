import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../type/Todo';

type Props = {
  todos: Todo[],
};
export const TodoList = ({ todos }: Props) => {
  return (
    <section className="TodoList">
      {todos
        .map(todo => <TodoInfo key={todo.id} todo={todo} />)}
    </section>
  );
};
