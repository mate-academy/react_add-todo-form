import React, { useState, FormEvent } from 'react';
import { Todo, User } from '../Interfaces';

interface Props {
  users: User[];
  todos: Todo[];
  onAddTodo: (newTodo: Todo) => void;
}

const maxId = (todos: Todo[]) => {
  return Math.max(...todos.map((todo) => todo.id || 0)) + 1;
};

export const TodoForm: React.FC<Props> = ({ users, todos, onAddTodo }) => {
  const [title, setTitle] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [userError, setUserError] = useState<string>('');
  const [titleError, setTitleError] = useState<string>('');

  const validateForm = () => {
    let valid = true;

    if (title.trim().length < 1) {
      setTitleError('Please enter a title');
      valid = false;
    } else {
      setTitleError('');
    }

    if (!selectedUser) {
      setUserError('Please choose a user');
      valid = false;
    } else {
      setUserError('');
    }

    return valid;
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cleanedInput = inputValue.replace(
      /[ыЫъЪэЭёЁ]/g, (match) => {
        switch (match) {
          case 'ы': return 'і';
          case 'Ы': return 'І';
          case 'ъ': return 'ї';
          case 'Ъ': return 'Ї';
          case 'э': return 'є';
          case 'Э': return 'Є';
          case 'ё':
          case 'Ё':
            return "'";
          default:
            return match;
        }
      },
    );

    setTitle(cleanedInput);

    if (cleanedInput.trim().length > 0) {
      setTitleError('');
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    setSelectedUser(selectedValue);

    if (selectedValue) {
      setUserError('');
    }
  };

  const handleTitleBlur = () => {
    validateForm();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onAddTodo(
        {
          id: maxId(todos),
          title,
          userId: parseInt(selectedUser, 10),
          completed: false,
        },
      );

      setTitle('');
      setSelectedUser('');
    }
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
          placeholder="title"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          required
        />
        <span className="error">{titleError}</span>
      </div>

      <div className="field">
        <select
          value={selectedUser}
          onChange={handleUserChange}
          data-cy="userSelect"
          required
        >
          <option value="" disabled>
            Choose a user
          </option>
          {users.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <span className="error">{userError}</span>
      </div>

      <button
        type="submit"
        data-cy="submitButton"
        onClick={validateForm}
      >
        Add
      </button>
    </form>
  );
};
