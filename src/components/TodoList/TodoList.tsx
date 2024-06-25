import { TodoCard } from '../../types/TodoCard';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoCard[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map((todo: TodoCard) => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </section>
);
