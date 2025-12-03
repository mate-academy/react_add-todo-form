import { TodoElement } from '../Type/type';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoElement[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
