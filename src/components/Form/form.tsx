import React, { useState } from 'react';
import { Todo, User } from '../Types/types';
import { getUserById } from '../../App';

interface Props {
  onAdd: (event: Todo) => void;
  todos: Todo[];
  users: User[];
}

interface FormValues {
  title: string;
  selected: number;
}

export const Form: React.FC<Props> = ({ onAdd, todos, users }) => {
  const [selected, setSelected] = useState(0);
  const [title, setTitle] = useState('');
  const [selectedError, setSelectedError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const formValues: FormValues = {
    title: title,
    selected: selected,
  };

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (titleError) {
      setTitleError(false);
    }

    setTitle(event.target.value);
  }

  function handleSelectedChange(event: React.ChangeEvent<HTMLSelectElement>) {
    if (selectedError) {
      setSelectedError(false);
    }

    setSelected(+event.target.value);
  }

  function cleanForm() {
    setTitle('');
    setSelected(0);
    setTitleError(false);
    setSelectedError(false);
  }

  function validateData(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!formValues.title.trim()) {
      setTitleError(true);
    }

    if (formValues.selected === 0) {
      setSelectedError(true);
    }

    if (!formValues.title.trim() || formValues.selected === 0) {
      return;
    }

    let newIndex: number = 1;

    if (todos.length > 0) {
      newIndex = Math.max(...todos.map(todo => todo.id)) + 1;
    }

    onAdd({
      id: newIndex,
      title: formValues.title,
      userId: formValues.selected,
      completed: false,
      user: getUserById(formValues.selected),
    });

    cleanForm();
  }

  return (
    <form action="/api/todos" method="POST" onSubmit={validateData} noValidate>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter your title"
        />

        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={selected}
          onChange={handleSelectedChange}
        >
          <option value="0">Choose a user</option>
          {users.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {selectedError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
