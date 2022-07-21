import { PrepareTodo } from '../../types/PrepareTodo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: PrepareTodo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
