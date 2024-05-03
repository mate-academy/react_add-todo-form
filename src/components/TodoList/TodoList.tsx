import { Todos } from '../../types/TodosType';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todos[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        return <TodoInfo todo={todo} key={todo.id} />;
      })}
    </section>
  );
};
