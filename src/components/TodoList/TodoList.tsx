import { TodoInfo } from '../TodoInfo';
import { Post } from '../Types/Post';

type Props = {
  todos: Post[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map((todo: Post) => (
      <TodoInfo
        todo={todo}
        key={todo.id}
      />
    ))}
  </section>
);
