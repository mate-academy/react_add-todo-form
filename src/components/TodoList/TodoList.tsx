import { TodoInfo } from '../TodoInfo/';
import { Todo } from '../../types';

type Props = {
  todoList: Todo[];
};

export const TodoList = (props: Props) => {
  return (
    <section className="TodoList">
      {props.todoList.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
