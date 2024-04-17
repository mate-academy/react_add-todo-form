import { TodoInfo } from '../TodoInfo';
import { ToDo } from '../../types/ToDo';

type Props = {
  todos: ToDo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo: ToDo) => {
        return <TodoInfo key={todo.id} todo={todo} />;
      })}
    </section>
  );
};