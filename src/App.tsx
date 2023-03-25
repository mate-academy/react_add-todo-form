import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './components/types/User';
import { Todo } from './components/types/Todo';

function findUser(todoId: number): User | null {
  const user = usersFromServer.find(person => person.id === todoId);

  return user || null;
}

const todosWithUser: Todo[] = todosFromServer.map(todo => (
  {
    ...todo,
    user: findUser(todo.userId),
  }
));

export const App = () => {
  const [title, setNewTitle] = useState('');
  const [userId, setNewId] = useState(0);
  const [userSelected, isUserSelected] = useState(true);
  const [titleCreated, isTitleCreated] = useState(true);

  const maxTodoId = Math.max(...todosWithUser.map(todo => todo.id)) + 1;

  const addNewTodo = (todoId: number) => {
    const newUser = usersFromServer.find(user => user.id === todoId);

    if (newUser && title) {
      todosWithUser.push({
        id: maxTodoId,
        userId: todoId,
        title,
        completed: false,
        user: newUser,
      });

      setNewTitle('');
      setNewId(0);
    }

    if (!newUser) {
      isUserSelected(false);
    }

    if (!title) {
      isTitleCreated(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          addNewTodo(userId);
        }}
      >
        <div className="field">
          <label htmlFor="newTitle">
            Title:
            <input
              type="text"
              data-cy="titleInput"
              id="newTitle"
              value={title}
              placeholder="Enter a title"
              onChange={(event) => {
                setNewTitle(event.target.value);
                isTitleCreated(true);
              }}
            />
          </label>
          {!titleCreated && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="newUser">
            User:
            <select
              data-cy="userSelect"
              value={userId}
              id="newUser"
              onChange={(event) => {
                setNewId(+event.target.value);
                isUserSelected(true);
              }}
            >
              <option value="0" disabled> Choose a user </option>
              {usersFromServer.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {!userSelected && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todosWithUser} />
    </div>
  );
};
