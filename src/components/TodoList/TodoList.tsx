import { TodoInfo } from '../TodoInfo';
import { TodoWithUser } from '../types';

interface Props {
  todos: TodoWithUser[];
}
export const TodoList:React.FC<Props> = (props) => {
  const { todos } = props;

  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo data-id={todo.id} todo={todo} key={todo.id} />
      ))}

    </section>
  );
};
