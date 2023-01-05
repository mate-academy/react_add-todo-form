import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';

interface Props{
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      {todos.map((todo: Todo) => (
        <section className="TodoList" key={todo.id}>
          <TodoInfo todo={todo} />
        </section>
      ))}
    </>
  );
};
