import { Todo } from '../../types/todo';

import { TodoInfo } from '../TodoInfo';

export const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
