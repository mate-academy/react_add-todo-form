import { TodoInfo } from '../TodoInfo/TodoInfo';

export const TodoList = ({ list }) => (
  <section className="TodoList">
    {list.map(todo => (
      <TodoInfo info={todo} key={todo.id} />
    ))}
  </section>
);
