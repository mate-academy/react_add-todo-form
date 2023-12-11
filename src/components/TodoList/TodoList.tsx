import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/todo';

type ToDosType = {
  todos: Todo[]
};

export const TodoList = ({ todos }: ToDosType) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        return (
          <TodoInfo todo={todo} key={todo.id} />
        );
      })}
    </section>
  );
};
