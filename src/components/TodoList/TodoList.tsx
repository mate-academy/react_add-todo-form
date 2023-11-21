import { ITodo } from '../../types/todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: ITodo[]
};

export const TodoList: React.FC<Props> = ({
  todos: todosList,
}) => {
  return (
    <section className="TodoList">
      {
        todosList.map(todo => (
          <TodoInfo todo={todo} key={todo.id} />
        ))
      }
    </section>
  );
};
