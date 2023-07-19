import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo, TodoWithUser, User } from './types';
import { TodoList } from './components/TodoList';
import { TextField } from './components/TextField';
import { SelectField } from './components/SelectField';

const todosWithUsers: TodoWithUser[] = todosFromServer.map((todo: Todo) => {
  const user: User | null = usersFromServer.find(({ id }) => id === todo.userId)
    || null;

  return {
    ...todo,
    user,
  };
});

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');
  const [formTouched, setFormTouched] = useState(false);
  const [todos, setTodos] = useState(todosWithUsers);

  const maxIndex = Math.max(...todos.map(({ id }) => id));

  // #region handlers
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleUserIdChange = (newUserId: string) => {
    setUserId(newUserId);
  };

  const reset = () => {
    setTitle('');
    setUserId('0');
    setFormTouched(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || userId === '0') {
      setFormTouched(true);

      return;
    }

    const newTodo: TodoWithUser = {
      id: maxIndex + 1,
      title,
      userId: +userId,
      completed: false,
      user: usersFromServer.find(user => user.id === +userId)
        || null,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    reset();
  };
  // #endregion

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        key={todos.length}
        onSubmit={handleSubmit}
      >
        <TextField
          name="title"
          value={title}
          onChange={handleTitleChange}
          formTouched={formTouched}
          required
        />

        <SelectField
          name="user"
          value={userId}
          onChange={handleUserIdChange}
          options={usersFromServer}
          formTouched={formTouched}
          required
        />

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
