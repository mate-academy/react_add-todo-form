import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todoList: Todo[];
};

export const TodoList: React.FC<Props> = ({ todoList }) => (
  <section className="TodoList">
    {todoList.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
