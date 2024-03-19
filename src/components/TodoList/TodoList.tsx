import { getTodosWithUsers } from '../../functions';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../types/Todo';
interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  const displayedToDos = getTodosWithUsers(todos);

  return (
    <section className="TodoList">
      {displayedToDos.map(todo => {
        return <TodoInfo key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
