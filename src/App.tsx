import './App.scss';
import { useState } from 'react';

import { User } from './Types/User';
import { Todo } from './Types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | undefined {
  return usersFromServer.find((user: User) => user.id === userId);
}

export const todosWithUsers: Todo[] = todosFromServer.map((todo: Todo) => {
  const user = getUserById(todo.userId);

  return {
    ...todo,
    user: user ? user : undefined,
  };
});

export const App = () => {
  const [isValid, setIsValid] = useState({ title: true, user: true });
  const [todos, setTodos] = useState<Todo[]>(todosWithUsers);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState<User>();

  const onUserChange = (userId: string) => {
    const newUser = getUserById(Number(userId));

    if (!newUser) {
      return;
    }

    setIsValid(prevState => ({
      ...prevState,
      user: true, // Reset validation for the field being changed
    }));

    setSelectedUser(newUser);
  };

  const onTitleChange = (newTitle: string) => {
    if (!newTitle.trim()) {
      return;
    }

    setIsValid(prevState => ({
      ...prevState,
      title: true, // Reset validation for the field being changed
    }));

    setTitle(newTitle);
  };

  const addTodo = (todoToAdd: Todo) => {
    setTodos(prevTodos => [...prevTodos, todoToAdd]);
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title || !selectedUser) {
      setIsValid({
        title: !!title,
        user: !!selectedUser,
      });

      return;
    }

    addTodo({
      id: todos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1,
      title: title.trim(),
      completed: false,
      userId: selectedUser.id,
      user: selectedUser,
    });

    setTitle('');
    setSelectedUser(undefined);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder={title ? '' : 'Enter todo title'}
            value={title}
            onChange={titleEvent => onTitleChange(titleEvent.target.value)}
          />
          {!isValid.title && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser ? selectedUser.id : ''}
            onChange={todoUser => onUserChange(todoUser.target.value)}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user: User) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {!isValid.user && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
