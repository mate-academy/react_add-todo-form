import { Todo } from '../../types/ToDo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: [];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo: Todo) => {
        return <TodoInfo key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
