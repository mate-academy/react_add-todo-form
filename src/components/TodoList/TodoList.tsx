import { Todo } from '../../Types/Todo';
import { TodoInfo } from '../TodoInfo';

type TodoProps = {
  todos: Todo[];
};

export const TodoList = ({ todos }: TodoProps) => {
  return (
    <section className="TodoList">
      {
        todos.map(todo => <TodoInfo todo={{ ...todo }} key={todo.id} />)
      }
    </section>
  );
};
