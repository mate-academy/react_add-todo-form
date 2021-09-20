import React from 'react';

interface Props {
  todosArray: Todo[];
}

const TodoList: React.FC<Props> = ({ todosArray }) => (
  <ul className="list-group app__list">
    {todosArray.map(todo => {
      if (todo.user !== null) {
        return (
          <li
            className="list-group-item"
            key={todo.uuid}
          >
            {`Title: ${todo.title}. User: ${todo.user.name}`}
          </li>
        );
      }

      return null;
    })}
  </ul>
);

export default TodoList;
