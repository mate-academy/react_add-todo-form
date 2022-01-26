import React from 'react';

interface SearchProps {
  todo: Todo,
}

export const TodoInfo: React.FC<SearchProps> = ({ todo }) => (
  <div>
    <h2>{todo.title}</h2>
    {todo.completed
      ? (
        <>
          <span className="is-size-2">&#9989;</span>
          <span> Done</span>
        </>
      )
      : (
        <>
          <span className="is-size-2">&#128040;</span>
          <span> In progress</span>
        </>
      )}
  </div>
);
