// import { TodosFromServer } from '../../types/TodosWithUsers';
import { TodosFromServer } from '../../types/TodosFromServer';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodosFromServer[];
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
