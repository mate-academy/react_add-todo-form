import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../Types/Todo';

type Props = {
  todoList: Todo[];
};

export const TodoList = ({ todoList }: Props) => {
  if (todoList) {
    return (

      <section className="TodoList">
        {todoList.map((todo) => {
          return (
            <>
              <TodoInfo todo={todo} />

            </>

          );
        })}
      </section>
    );
  }

  return null;
};
