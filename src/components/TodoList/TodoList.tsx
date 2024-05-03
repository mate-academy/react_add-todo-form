import React from "react";
import {TodoInfo} from "../TodoInfo";
import TodosWithUsers from "../../types/TodosWithUsers";

interface Props{
  todos: TodosWithUsers[]
}

export const TodoList:React.FC<Props> = ({todos}) => {
  return(
      <section className="TodoList">
        {todos.map(todo =>
          <TodoInfo
            todo = {todo}
            key = {todo.id}
          />
        )}
      </section>
    )
};
