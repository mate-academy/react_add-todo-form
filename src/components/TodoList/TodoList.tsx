import ToDo from '../../types/ToDo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: ToDo[];
}

export const TodoList: React.FC<Props> = ({ todos }: Props) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
