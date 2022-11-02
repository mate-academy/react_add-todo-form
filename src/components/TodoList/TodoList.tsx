import { TodoInfo } from '../TodoInfo';

import { FullTodoInfo } from '../../types/FullTodoInfo';

type Props = {
  todos: FullTodoInfo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {
        todos.map(todo => (
          <TodoInfo todo={todo} key={todo.id} />
        ))
      }
    </section>
  );
};
