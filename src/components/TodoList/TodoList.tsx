import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type ToDo = {
  todos: Todo[];
};

export const TodoList: React.FC<ToDo> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
