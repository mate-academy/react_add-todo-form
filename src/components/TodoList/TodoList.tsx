import { Todo } from '../../types/todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todoTask => (
      <TodoInfo
        key={todoTask.id}
        todo={todoTask}
      />
    ))}
  </section>
);
