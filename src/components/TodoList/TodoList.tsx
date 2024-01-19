import { TodoInfo } from '../TodoInfo';
import { Todo } from '../types';

interface Prop {
  todos: Todo[]
}

export const TodoList: React.FC<Prop> = ({ todos }) => (
  <section className="TodoList">
    {todos.map((todo) => (
      <TodoInfo
        key={todo.id}
        todo={todo}
      />
    ))}
  </section>
);
