import React from "react";
import { Todo } from "../../types";
import { TodoInfo } from "../TodoInfo/TodoInfo";

interface TodoListProps {
  todos: Todo[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <>
      {todos.length > 0 ? (
        todos.map(todo => (
          <TodoInfo key={todo.id} todo={todo} />
        ))
      ) : (
        <p>No todos available</p>
      )}
    </>
  );
};
