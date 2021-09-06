import React from 'react';
import '../App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

type Props = {
  tasks: Task[];
};

export const TodoList: React.FC<Props> = (props) => {
  const { tasks } = props;

  return (
    <>
      <ul className="App__list list-group mb-5">
        {tasks.map(task => (
          <li key={task.id} className="App__item list-group-item list-group-item-action flex-column">
            {task.user && (
              <div className="d-flex flex-column w-100 App__item--container">
                <p className="App__user-name">
                  {task.user.name}
                </p>
                <p className="App__task">
                  {task.title}
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};
