import React, { useState } from 'react';
import './App.scss';
import { Todo, User } from './components/Types/types';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
// import { todo } from 'node:test';

const enrichTodos = (
  todosToEnrich: Omit<Todo, 'user'>[],
  usersList: User[],
): Todo[] => {
  return todosToEnrich.map(todo => {
    const foundUser = usersList.find(u => u.id === todo.userId);

    return {
      ...todo,
      user: foundUser || usersList[0],
    };
  });
};

export const App: React.FC = () => {
  const users: User[] = usersFromServer;
  const enrichedTodos = enrichTodos(todosFromServer, usersFromServer);
  const [todos, setTodos] = useState<Todo[]>(enrichedTodos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const isTitleEmpty = title.trim() === '';
    const isUserNotSelected = selectedUserId === 0;

    setTitleError(isTitleEmpty);
    setUserError(isUserNotSelected);

    const formIsValid = !isTitleEmpty && !isUserNotSelected;

    if (!formIsValid) {
      return;
    }

    // eslint-disable-next-line max-len
    const maxId = todos.length > 0 ? Math.max(...todos.map(t => t.id || 0)) : 0;
    const currentUser = users.find(u => u.id === selectedUserId);

    const newTodo: Todo = {
      id: maxId + 1,
      title: title,
      userId: selectedUserId,
      completed: false,
      user: currentUser as User,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setSelectedUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Please enter a title"
            onChange={e => {
              setTitle(e.target.value);
              setTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={e => {
              setSelectedUserId(Number(e.target.value));
              setUserError(false);
            }}
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
