import { Todo } from '../../Types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todoList: Todo[];
};

export const TodoList: React.FC<Props> = ({ todoList }) => {
  return (
    <section className="TodoList">
      {todoList.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
