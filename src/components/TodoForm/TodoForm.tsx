import React, { useState } from 'react';

import './TodoForm.scss';

import { User, Todo } from '../../react-app-env';

interface Props {
  users: User[]
  onAdd: (todo: Todo) => void;
}

const initialTodo: Todo = {
  id: 0,
  title: '',
  completed: false,
  userId: 0,
};

export const TodoForm: React.FC<Props> = ({
  users,
  onAdd,
}) => {
  const [touched, setTouched] = useState(false);
  const [count, setCount] = useState(0);
  const [todo, setTodo] = useState(initialTodo);

  const handleReset = () => {
    setTodo(initialTodo);
  };

  const handleInputChange = (key: string, value: string) => {
    setTodo((currentState) => ({ ...currentState, [key]: value }));
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setCount(count + 1);

    onAdd(todo);

    handleReset();
  };

  return (
    <form
      key={count}
      onSubmit={handleSubmit}
    >
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          className="input"
          placeholder="Type a title of todo"
          value={todo.title}
          onChange={e => handleInputChange('title', e.target.value)}
          onBlur={() => setTouched(true)}
        />
        {touched && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select data-cy="userSelect" defaultValue={0}>
          <option value="0" disabled>
            Choose a user
          </option>
          {users.map((user) => {
            return (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>

        <span className="error">Please choose a user</span>
      </div>

      <button
        type="submit"
        data-cy="submitButton"
      >
        Add
      </button>
    </form>
  );
};
