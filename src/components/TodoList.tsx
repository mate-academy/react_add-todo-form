import React from 'react';
import '../App.scss';

type Props = {
  tasks: Task[];
};

export const TodoList: React.FC<Props> = (props) => {
  const { tasks } = props;

  return (
    <>
      <ul className="App__list">
        {tasks.map(task => (
          <li key={task.id} className="App__item">
            {task.user && (
              <>
                <p className="App__user-name">
                  {task.user.name}
                </p>
                <p className="App__task">
                  {task.title}
                </p>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};
