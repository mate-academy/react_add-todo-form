import { TodoItem } from '../../types/TodoItem';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoItem[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map((item: TodoItem) => (
      <TodoInfo item={item} key={item.id} />
    ))}
  </section>
);
