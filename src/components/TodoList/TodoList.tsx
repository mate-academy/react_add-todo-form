import { TodoInfo } from '../TodoInfo';
import * as Types from '../../types';

export const TodoList = ({ todos = [] }: Types.PropTodos) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        return <TodoInfo key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
