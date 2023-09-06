import './App.scss';
import { useState } from 'react';
import { Todo, User } from './types';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): User | null {
  return usersFromServer.find((user) => user.id === userId) ?? null;
}

export const App = () => {
  const [title, setTitle] = useState<string>('');
  const [tasks, setTasks] = useState<Todo[]>(todosFromServer);
  const [selectedUserId, setselectedUserId] = useState<number>(0);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, ''));
  };

  const newTaskId = (listOfTasks: Todo[]) => {
    const newId
    = Math.max(...listOfTasks.map((task) => task.id), 0);

    return newId + 1;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (title.length !== 0 && selectedUserId) {
      tasks.push({
        id: newTaskId(tasks),
        title,
        completed: false,
        userId: selectedUserId,
        user: null,
      });

      setTasks([...tasks]);
      setTitle('');
      setselectedUserId(0);
      setFormSubmitted(false);
    }
  };

  const todosWithUsers = tasks.map((todo) => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              onChange={handleTitleChange}
              value={title}
            />
          </label>
          {formSubmitted && title.trim() === '' && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={selectedUserId}
              // eslint-disable-next-line
              onChange={(event) => setselectedUserId(Number(event.target.value))}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {formSubmitted && !selectedUserId && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <div className="App">
        <TodoList todos={todosWithUsers} />
      </div>
    </div>
  );
};
