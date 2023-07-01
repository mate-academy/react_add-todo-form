import { TodoInfo } from '../TodoInfo';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="TodoList">
      {todos.map((todo: Todo) => {
        const {
          title,
          id,
          completed,
          user,
        } = todo;

        return (
          <TodoInfo
            title={title}
            id={id}
            completed={completed}
            user={user}
          />
        );
      })}
    </ul>
  );
};
