import React, { useState } from 'react';
import { Todo } from '../../types/TypeTodo';
import users from '../../api/users';

interface Props{
  addTodo: (todo: Todo) => void
}

export const Form: React.FC<Props> = ({ addTodo }) => {
  const [touched, setTouched] = useState({
    input: false,
    select: false,
  });
  const [todoInfo, setTodoInfo] = useState({
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  });

  const reset = () => {
    setTouched({
      input: false,
      select: false,
    });
    setTodoInfo({
      id: 0,
      title: '',
      completed: false,
      userId: 0,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!todoInfo.title || todoInfo.userId === 0) {
      return;
    }

    addTodo(todoInfo);
    reset();
  };

  return (

    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={todoInfo.title}
          onChange={(e) => setTodoInfo({ ...todoInfo, title: e.target.value })}
          onBlur={() => setTouched({ ...touched, input: true })}

        />
        {touched.input && !todoInfo.title && (
          <span className="error">Please enter a title</span>)}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={todoInfo.userId}
          onChange={(e) => {
            setTodoInfo({ ...todoInfo, userId: +e.target.value });
          }}
          onBlur={() => {
            setTouched({ ...touched, select: true });
          }}
        >
          <option value="0">Choose a user</option>

          {users.map((elem) => (
            <option value={elem.id}>{elem.name}</option>
          ))}
        </select>

        {touched.select && todoInfo.userId === 0
          && (<span className="error">Please choose a user</span>)}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
