import { Todo } from '../../App';
import { TodoInfo } from '../TodoInfo';

export const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => {
  return (
    <>
      <section className="TodoList">
        {todos.map(todo => {
          return <TodoInfo todo={todo} key={todo.id} />;
        })}
      </section>
    </>
  );
};
