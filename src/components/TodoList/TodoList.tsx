import React from "react";
import { TodoInfo } from "../TodoInfo";
import todosFromServer from '../../api/todos';
import usersFromServer from '../../api/users';

type Todo = (typeof todosFromServer)[number] & {
  user?: (typeof usersFromServer)[number];
};

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo
        key={todo.id}
        todo={todo}
      />
    ))}
  </section>
);

