import './App.scss';
import { useState } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const App = () => {
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState(todosFromServer);
  const [chosenUserId, setChosenUserId] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedTitle
      = event.target.value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

    setTitle(cleanedTitle);
  };

  const newTaskId = (listOfTasks: Todo[]) => {
    const ids = listOfTasks.map(task => task.id);
    const maxId = Math.max(...ids);

    return maxId + 1;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (title.trim() !== '' && chosenUserId) {
      const newTodo = {
        id: newTaskId(tasks),
        title,
        completed: false,
        userId: +chosenUserId,
        user: null,
      };

      setTasks([...tasks, newTodo]);
      setTitle('');
      setChosenUserId(0);
      setFormSubmitted(false);
    }
  };

  const todos = () => tasks.map(todo => ({
    ...todo,
    user: getUser(todo.userId),
  }));

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >

        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
            {formSubmitted && title.trim() === ''
              && (<span className="error">Please enter a title</span>
              )}
          </label>
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={chosenUserId}
              onChange={(event) => setChosenUserId(+event.target.value)}
            >
              <option value="0" disabled>Choose a user</option>
              {
                usersFromServer.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))
              }

            </select>

            {formSubmitted && !chosenUserId
              && (
                <span className="error">Please choose a user</span>
              )}
          </label>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <div className="App">
        <h1 className="App__title">Static list of todos</h1>
        <TodoList todos={todos()} />
      </div>
    </div>
  );
};
