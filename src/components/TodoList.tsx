import React from 'react';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = (props) => {
  const { todos } = props;

  return (
    <>
      {todos.map(todo => (
        <li key={todo.id} className="list-group-item">
          {todo.title}
        </li>
      ))}
    </>
  );
};
