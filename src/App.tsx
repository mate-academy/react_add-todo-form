import './App.scss';
import { FC, useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import usersFromServer from './api/users';
import { getUser } from './helpers/getUser';
import { todosList } from './helpers/todosList';

export const App: FC = () => {
  const [todos, setTodos] = useState([...todosList]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [title, setTitle] = useState('');
  const [titleErrorField, seTtitleErrorField] = useState(false);
  const [selectErrorField, setSelectErrorField] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      seTtitleErrorField(true);
    }

    if (!selectedUser) {
      setSelectErrorField(true);
    }

    if (title && selectedUser) {
      const createId = (arr:Todo[]) => {
        const ids = arr.map(item => item.id);

        return Math.max(...ids) + 1;
      };

      setTodos(prevTodos => {
        const newTodo: Todo = {
          id: createId(prevTodos),
          title,
          completed: false,
          userId: selectedUser,
          user: getUser(selectedUser),
        };

        return [...prevTodos, newTodo];
      });

      setTitle('');
      setSelectedUser(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value.trim());
              seTtitleErrorField(false);
            }}
          />
          {titleErrorField && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={(event) => {
              setSelectedUser(+event.target.value);
              setSelectErrorField(false);
            }}
          >
            <option value={0} disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => {
              const { name, id } = user;

              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </select>
          {selectErrorField && (
            <span className="error">Please choose a user</span>
          )}

        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
