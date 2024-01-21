/* eslint-disable max-len */
import { TodoInfo } from '../TodoInfo';
import { ToDosWithUserProps } from '../types';

export const TodoList: React.FC<ToDosWithUserProps> = ({ todos }) => {
  return (
    <div>
      <section className="TodoList">
        {todos.map(todo => <TodoInfo key={todo.id} todo={todo} data-id={todo.id} />)}
      </section>
    </div>
  );
};
