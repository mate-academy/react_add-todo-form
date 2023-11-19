import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/TodosProps';

type TodosProps = {
  todos: Todo[]
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
