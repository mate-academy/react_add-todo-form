import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/Todo';

interface TodoFormProps {
  onAddTodo: (todo: Todo) => void;
  maxId: number;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo, maxId }) => {
  const [todo, setTodo] = useState({
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  });

  const [isUserChosen, setIsUserChosen] = useState(true);
  const [isTitleEntered, setIsTitleEntered] = useState(true);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTodo(prevTodo => ({
      ...prevTodo,
      title: event.target.value,
      id: maxId + 1,
    }));

    setIsTitleEntered(true);
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setTodo(prevTodo => ({
      ...prevTodo,
      userId: +event.target.value,
    }));

    setIsUserChosen(true);
  }

  const handleReset = () => {
    setTodo({
      id: 0,
      title: '',
      completed: false,
      userId: 0,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!todo.title.trim()) {
      setIsTitleEntered(false);
    }

    if (!todo.userId) {
      setIsUserChosen(false);
    }

    if (!todo.title.trim() || !todo.userId) {
      return;
    }

    onAddTodo(todo);
    handleReset();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={todo.title}
          onChange={event => handleInputChange(event)}
        />
        {!isTitleEntered && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={todo.userId}
          onChange={event => handleSelectChange(event)}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {usersFromServer.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {!isUserChosen && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
