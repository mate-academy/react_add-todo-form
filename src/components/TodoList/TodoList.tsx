import { TodoInfo } from '../TodoInfo';
import { TasksWithTodo } from '../../types/Todo';

type Props = {
  todos: TasksWithTodo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(el => (
      <TodoInfo todo={el} key={el.id} />
    ))}
  </section>
);
