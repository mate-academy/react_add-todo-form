import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../Types/Todo';

type Todos = {
  todos: Array<Todo>;
};

export const TodoList: React.FC<Todos> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
