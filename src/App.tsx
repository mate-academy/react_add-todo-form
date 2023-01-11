import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';
import { User } from './types/User';

import { TodoList } from './components/TodoList';

function getUserByID(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todosWithUser: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserByID(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUser);
  const [title, setTitle] = useState('');
  const [selectedUserID, setSelectedUserID] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const getHighestTodoID = () => {
    const userIDs = todos.map(todo => todo.id);

    return Math.max(...userIDs) + 1;
  };

  const clearForm = () => {
    setTitle('');
    setSelectedUserID('');
    setIsFormSubmitted(false);
  };

  const handleSubmitForm = () => {
    setIsFormSubmitted(true);

    if (!title || !selectedUserID) {
      return;
    }

    const newTodo = {
      id: getHighestTodoID(),
      title,
      completed: false,
      userId: +selectedUserID,
      user: getUserByID(+selectedUserID),
    };

    setTodos([...todos, newTodo]);

    clearForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmitForm();
        }}
      >
        <div className="field">
          <label>
            <input
              type="text"
              placeholder="Write your title"
              data-cy="titleInput"
              value={title}
              onChange={(event) => setTitle(event.currentTarget.value)}
            />

            {isFormSubmitted && !title
              && <span className="error">Please enter a title</span>}
          </label>
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserID}
            onChange={(event) => setSelectedUserID(event.currentTarget.value)}
          >
            <option value="" disabled>Choose a user</option>

            {usersFromServer.map(user => {
              return (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {isFormSubmitted && !selectedUserID
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
