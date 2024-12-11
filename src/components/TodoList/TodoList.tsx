import { TodoInfo } from '../TodoInfo';
import { ITodoListItem } from '../../interface/ITodoListItem';

type Props = {
  todos: ITodoListItem[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
