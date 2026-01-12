import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';

type Props = {
  toDos: Todo[];
};

export const TodoList = (props: Props) => {
  return (
    <section className="TodoList">
      {props.toDos.map(todo => {
        return <TodoInfo key={todo.id} toDoInfo={todo} />;
      })}
    </section>
  );
};
