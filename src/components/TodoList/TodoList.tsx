import { TodoInfo } from '../TodoInfo';
import { Todos } from '../../types/TodosProps';

type TodosProps = {
  todos: Todos[]
};

export const TodoList: React.FC<TodosProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(listCh => (
        <TodoInfo
          todo={listCh}
          key={listCh.id}
        />
      ))}
    </section>
  );
};
