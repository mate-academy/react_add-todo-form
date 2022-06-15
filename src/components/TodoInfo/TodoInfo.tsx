import React from 'react';
import { PreparedTodos } from '../../types';
import { UserInfo } from '../UserInfo';

type Props = {
  prepared: PreparedTodos,
};

export const TodoInfo: React.FC<Props> = ({ prepared }) => {
  return (
    <div
      className="
      card
      w-50
      p-4
      mb-5
      h-50
      me-5
      ms-5
      border-primary
      border-opacity-50
      rounded-3
      d-flex
      justify-content-center
      "
      key={prepared.id}
    >
      <div
        data-cy="title"
        className="fs-3 fw-semibold fst-italic mb-3 w-50"
      >
        {prepared.title.toUpperCase()}
      </div>
      <div className="
        card-body
        bg-primary
        bg-gradient
        border
        border-primary
        rounded-4
        text-white
        w-50
        h-50
      "
      >
        <div data-cy="status" className="fs-3">
          {`Completed: ${prepared.completed}`}
        </div>
        {prepared.user && (
          <UserInfo user={prepared.user} />
        )}
      </div>
    </div>
  );
};

// Create a `TodoInfo` component accepting a `todo` object and use it in the
// list to render `title`, `completed` status and `User`

// Add a default export statement for TodoInfo component to use it in the other files
