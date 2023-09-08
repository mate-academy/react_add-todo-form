import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types';

export const TodoList:React.FC<{ todos: Todo[] }> = ({ todos: list }) => (
  <section className="TodoList">
    {list && list.map((todo:Todo) => <TodoInfo key={todo.id} todo={todo} />)}
  </section>
);
