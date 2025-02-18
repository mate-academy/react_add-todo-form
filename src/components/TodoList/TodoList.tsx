import { TodoUser } from '../../types/TodoUser';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: TodoUser[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo: TodoUser, index) => (
        <TodoInfo todo={todo} key={index} />
      ))}
    </section>
  );
};
