import { TodoWithUser } from '../../types/todo';
import { TodoInfo } from '../TodoInfo';

type Prop = {
  todos: TodoWithUser[];
};

export const TodoList = ({ todos }: Prop) => {
  return (
    <section className="TodoList">
      {todos.map(item => (
        <TodoInfo key={item.id} todo={item} />
      ))}
    </section>
  );
};
