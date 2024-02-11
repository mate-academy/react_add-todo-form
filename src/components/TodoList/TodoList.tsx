import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/TypeTodo';

interface TodoProps {
  todos: Todo[],
}

export const TodoList: React.FC<TodoProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(elem => (
        <TodoInfo todo={elem} key={elem.id} />
      ))}
    </section>
  );
};
