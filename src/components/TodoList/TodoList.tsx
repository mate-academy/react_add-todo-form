import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TodoList.scss';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = React.memo((props) => {
  const { todos } = props;

  return (
    <ul className="cards">
      {todos.map(todo => {
        const {
          user,
          id,
          title,
        } = todo;

        return (
          <li
            key={id}
            className="cards__card-todo card"
          >
            {user && (
              <>
                <h2 className="cards-title">{user.name}</h2>
                <div className="cards-text">{title}</div>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
});
