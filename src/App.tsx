import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo, User, TodosWithUser } from './types/Types';

export const App = () => {
  const users: User[] = usersFromServer;
  const todos: Todo[] = todosFromServer;

  function preparedTodosWithUsers(): TodosWithUser[] {
    return (
      todos.map(todo => ({
        ...todo,
        user: users.find(user => user.id === todo.userId) || null,
      }))
    );
  }

  const [selectedUser, setSelectedUser] = useState('');
  const [currentTitle, setCurrentTitle] = useState('');
  // eslint-disable-next-line max-len
  const [todosWithUsers, setTodosWithUsers] = useState<TodosWithUser[]>(preparedTodosWithUsers());
  const [addValidated, setAddValidated] = useState(true);

  const validatedTitleAndUser = currentTitle && selectedUser;

  const handleAddButton = (event:React.FormEvent<HTMLInputElement>) => {
    if (validatedTitleAndUser) {
      event.preventDefault()
      setTodosWithUsers(
        [...todosWithUsers,
          {
            id: (todos.sort((a, b) => b.id - a.id)[0].id + 1),
            title: currentTitle,
            userId: Number(selectedUser),
            completed: false,
            user: users.find(user => user.id === Number(selectedUser)) || null,
          },
        ],
      );
      setAddValidated(true);
      setSelectedUser('');
      setCurrentTitle('');
    } else {
      setAddValidated(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => (handleAddButton(event))}
      >
        <div className="field">
          <label htmlFor="titleInput">
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={currentTitle}
              onChange={event => setCurrentTitle(event.target.value)}
            />
          </label>
          {(!addValidated && !currentTitle) && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={event => setSelectedUser(event.target.value)}
            >
              <option
                value=""
                selected
                disabled
              >
                Choose a user
              </option>

              {users.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {(!addValidated && !selectedUser) && (
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

      {todosWithUsers.map(todo => (
        <TodoList
          key={todo.id}
          todo={todo}
        />
      ))}
    </div>
  );
};
