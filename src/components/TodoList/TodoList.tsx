import { Todo } from '../../types/Todo';

import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      {todos.length > 0 && (
        <>
          {todos.map(todo => {
            return <TodoInfo key={todo.id} todo={todo} />;
          })}
        </>
      )}
    </>
  );
};
