import { TodoWithUserInfo } from '../../types/todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoWithUserInfo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
