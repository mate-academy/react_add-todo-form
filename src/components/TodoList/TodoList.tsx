import { PreparedTodo } from '../../types/PreparedTodo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: PreparedTodo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
