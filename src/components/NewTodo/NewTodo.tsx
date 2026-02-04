import React, { useState } from 'react';

import { TodoDraft } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  users: User[];
  onSubmit: (todoDraft: TodoDraft) => void;
};

const emptyTodoDraft: TodoDraft = {
  title: '',
  completed: false,
  userId: 0,
};

export const NewTodo: React.FC<Props> = ({ users, onSubmit }) => {
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [formCount, setFormCount] = useState(0);
  const [todoDraft, setTodoDraft] = useState<TodoDraft>(emptyTodoDraft);

  const setTodoField = (field: 'title' | 'userId', value: string | number) => {
    setTodoDraft(current => ({ ...current, [field]: value }));
  };

  const isSubmitDisabled = (): boolean => {
    return !todoDraft.title.trim() || !todoDraft.userId;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isSubmitDisabled()) {
      setIsAddClicked(true);

      return;
    }

    onSubmit(todoDraft);

    setTodoDraft(emptyTodoDraft);
    setFormCount(currentCount => currentCount + 1);
    setIsAddClicked(false);
  };

  return (
    <form key={formCount} onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={todoDraft.title}
          placeholder="Enter todo title"
          onChange={event => setTodoField('title', event.target.value)}
        />

        {isAddClicked && todoDraft.title.trim() === '' && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={todoDraft.userId}
          onChange={event => setTodoField('userId', +event.target.value)}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {isAddClicked && todoDraft.userId === 0 && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
