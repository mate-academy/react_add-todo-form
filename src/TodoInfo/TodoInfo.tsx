import React from 'react';
import '../style/ToDoListStyles.scss';

type Props = {
  userId:number;
  title:string;
  completed:boolean;
};

const TodoInfo: React.FC<Props>
  = ({
    userId,
    title,
    completed,
  }) => {
    return (
      <ul className="ul_reset">
        <li>
          User Id :
          {userId}
        </li>
        <li>
          Title:
          {title}
        </li>
        <li className={completed ? 'isCompleted' : 'notCompleted'}>
          {completed ? 'Is Completed' : 'Not Completed'}
        </li>
      </ul>
    );
  };

export default TodoInfo;
