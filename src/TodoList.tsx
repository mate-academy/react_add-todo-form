import React from "react";


type Props = {
  todos: string[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <div>
      <div>{todos.title}</div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
