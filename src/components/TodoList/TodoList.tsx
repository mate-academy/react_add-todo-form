import { Todo } from '../../types/Types';
import { TodoInfo } from '../TodoInfo';

type Props = {
  newTodos: Todo[],
};

export const TodoList = ({ newTodos }: Props) => {
  return (
    <>
      <section className="TodoList">
        {newTodos.map((todo: Todo, index: number) => {
          return (
            <TodoInfo
              todo={todo}
              index={index + 1}
            />
          );
        })}
      </section>
    </>
  );
};
