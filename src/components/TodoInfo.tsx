import React from 'react';

type Props = {
  userTitle: string;
};

const TodoInfo: React.FC<Props> = ({ userTitle }) => {
  return (
    <div>
      <p>{userTitle}</p>
    </div>
  );
};

export default TodoInfo;
