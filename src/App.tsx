import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type TODO = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
};

function largestId(array: TODO[]): number {
  const prepArr = [...array].sort((a, b) => b.id - a.id);

  return prepArr[0]?.id;
}

function findUserById(selectedUser: number): User {
  return usersFromServer.find(userX => userX.id === selectedUser) as User;
}

export const App = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [todoTitle, setTodoTitle] = useState('');
  const [visibleTodos, setVisibleTodos] = useState<TODO[]>(todosFromServer);
  const [isTouched, setIsTouched] = useState(false);

  const isReady = !!todoTitle && !!selectedUser;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsTouched(true);

    if (!isReady) {
      return;
    }

    const user = findUserById(+selectedUser);

    if (!user) {
      return;
    }

    const newTodo: TODO = {
      id: largestId(visibleTodos) + 1,
      title: todoTitle,
      completed: false,
      userId: user.id,
      user,
    };

    setVisibleTodos([...visibleTodos, newTodo]);
    setSelectedUser('');
    setTodoTitle('');
    setIsTouched(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          Title:
          <input
            type="text"
            data-cy="titleInput"
            value={todoTitle}
            placeholder="Enter a title"
            onChange={event => setTodoTitle(event.target.value)}
          />
          {!todoTitle && isTouched && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          User:
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={event => setSelectedUser(event.target.value)}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {!selectedUser && isTouched && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList visibleTodos={visibleTodos} findUserById={findUserById} />
    </div>
  );
};
