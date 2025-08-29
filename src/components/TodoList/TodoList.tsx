import { TodoWithUsers } from '../../types/TodoWithUsersType';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: TodoWithUsers[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo: TodoWithUsers) => {
        return <TodoInfo key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
