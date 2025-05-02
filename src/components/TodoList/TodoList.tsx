import React from 'react';

interface TaskType {
  id: number;
  title: string;
  name: string;
}

interface Props {
  taskArray: TaskType[];
}

export const TodoList = ({ taskArray }: Props) => {
  return (
    <>
      {taskArray.map(item => (
        <article data-id={item.id} className="TodoInfo" key={item.id}>
          <h2 className="TodoInfo__title">{item.title}</h2>
          <a className="UserInfo" href="mailto:Julianne.OConner@kory.org">
            {item.name}
          </a>
        </article>
      ))}
    </>
  );
};
