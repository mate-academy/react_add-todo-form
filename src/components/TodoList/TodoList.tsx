import { TodoInfo } from '../TodoInfo';

import { PreparedTodo } from '../types/preparedTodo';

type Props = {
  prepared: PreparedTodo[];
};
export const TodoList: React.FC<Props> = ({ prepared }) => (
  <section className="TodoList">
    {prepared.map(todo => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </section>
);
