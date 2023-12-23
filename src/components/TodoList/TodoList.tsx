import { TodoAndUser } from '../../types/types';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: TodoAndUser[]
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo => (
        <TodoInfo key={todo.id} todo={todo} />
      )))}
    </section>
  );
};
