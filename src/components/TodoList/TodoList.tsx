import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
};

export const TodoList:React.FC<Props> = ({ todos }) => {
  return (
    <>
      { todos.map(todo => {
        return (
          <section className="TodoList" key={todo.id}>
            <TodoInfo todo={todo} />
          </section>
        );
      })}
    </>
  );
};
