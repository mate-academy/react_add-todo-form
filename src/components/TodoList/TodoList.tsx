import { TodoInfo } from '../TodoInfo/';
import { Todo } from '../../types';

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
