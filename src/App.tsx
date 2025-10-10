import React, { useMemo, useState } from 'react';
import './App.scss';

import users from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type TodoRaw = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type TodoWithUser = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;      
  user: User;
};


const makeTodoWithUser = (t: TodoRaw): TodoWithUser => {
  const user = users.find(u => u.id === t.userId);
  if (!user) throw new Error(`User ${t.userId} not found`);
  return {
    id: t.id,
    title: t.title,
    completed: t.completed,
    userId: t.userId,   
    user,
  };
};


export const App: React.FC = () => {

  const [todos, setTodos] = useState<TodoWithUser[]>(
    todosFromServer.map(makeTodoWithUser),
  );


  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number | ''>('');
  const [touched, setTouched] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const maxId = useMemo(
    () => (todos.length ? Math.max(...todos.map(t => t.id)) : 0),
    [todos],
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    setTouched(true);

    const hasTitleError = title.trim() === '';
    const hasUserError = userId === '';

    setTitleError(hasTitleError);
    setUserError(hasUserError);

    if (hasTitleError || hasUserError) {
      return;
    }

    
    const selectedUser = users.find(u => u.id === Number(userId));
    if (!selectedUser) return;

    const newTodo: TodoWithUser = {
      id: maxId + 1,
      title: title.trim(),
      completed: false,
      userId: selectedUser.id,
      user: selectedUser,
    };

    setTodos(prev => [...prev, newTodo]);

  
    setTitle('');
    setUserId('');
    setTitleError(false);
    setUserError(false);
    setTouched(false);
  };

  const onTitleChange: React.ChangeEventHandler<HTMLInputElement> = changeEvent => {
    setTitle(changeEvent.target.value);
    if (touched) setTitleError(false);
  };

  const onUserChange: React.ChangeEventHandler<HTMLSelectElement> = changeEvent => {
    const value = changeEvent.target.value === '' ? '' : Number(changeEvent.target.value);
    setUserId(value);
    if (touched) setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">
            <strong>Title:</strong>
          </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={onTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">
            <strong>User:</strong>
          </label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={onUserChange}
          >
            <option value="">Choose a user</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

    
      <TodoList todos={todos} />
    </div>
  );
};


