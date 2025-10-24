import { TodoInfo } from '../TodoInfo/TodoInfo';

export const TodoList = ({ list, getUserById }) => {
  return (
    <section className="TodoList">
      {list.map(l => (
        <TodoInfo info={l} key={l.id} getUserById={getUserById} />
      ))}
    </section>
  );
};
