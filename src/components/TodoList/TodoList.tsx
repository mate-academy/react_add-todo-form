import { Post } from '../../types/Post';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Post[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);

export default TodoList;
