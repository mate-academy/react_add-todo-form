import React from 'react';

export const TodoInfo: React.FC<Todo> = ({ title, completed }) => (
  <>
    <div>
      {`Task: ${title}`}
    </div>

    <div>
      {`Status: ${completed ? 'Done' : 'In progress'}`}
    </div>
  </>
);
