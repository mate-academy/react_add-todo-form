import React, { useState } from 'react';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

import './TodoItem.scss';

type Props = Pick<Todo, 'title' | 'completed' | 'id'> & {
  user: User,
};

const TodoItem: React.FC<Props> = React.memo(({
  title, completed, id, user,
}) => {
  const [done, setDone] = useState(completed);

  const handleClick = () => {
    setDone((currentDone) => !currentDone);
  };

  return (
    <li
      className={`todoItem ${done ? 'todoItem--completed' : ''}`}
    >
      <div>
        <i>{user.name}</i>
        <h4>{title}</h4>
      </div>
      <label htmlFor={`todoCheckbox_${id}`} className="todoItem__checkbox">
        <input
          type="checkbox"
          name="completed"
          id={`todoCheckbox_${id}`}
          checked={done}
          onChange={handleClick}
        />
      </label>
    </li>
  );
});

export default TodoItem;
