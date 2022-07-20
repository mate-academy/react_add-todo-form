// Don't forget to import the React library

// Create a `TodoInfo` component accepting a `todo` object and use it in the
// list to render `title`, `completed` status and `User`

// Add a default export statement for TodoInfo component to use it in the other files
import React from 'react';
import './TodoInfo.scss';
import { PreparedTodo } from '../../types/PreparedTodo';

type Props = {
  todo: PreparedTodo;
  onStatusClick: (id: number) => void;
};

export const TodoInfo: React.FC<Props> = ({ todo, onStatusClick }) => {
  const { id, title, completed } = todo;

  return (
    <div className="todo-info">
      <span data-cy="title">{title}</span>

      <button
        type="button"
        title={completed ? 'Done' : 'In process'}
        data-cy="status"
        onClick={() => onStatusClick(id)}
        className="todo-info__button"
      >
        {completed ? '✅' : '🟡'}
      </button>
    </div>
  );
};
