import { PreparedTodo, Todos } from '../../types/PreparedTodo';
import { TodoInfo } from '../TodoInfo';

export const TodoList: React.FC<Todos> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo: PreparedTodo) => {
        return <TodoInfo todo={todo} key={todo.id} />;
      })}
    </section>
  );
};
