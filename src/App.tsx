import './App.scss';
import { useState } from 'react';

import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [todoList, setTodoList] = useState(todos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  function createNewTask(event: React.FormEvent) {
    event.preventDefault();

    const task = {
      id: todoList.length,
      title,
      userId,
      completed: false,
      user: getUser(userId),
    };

    setTodoList([...todoList, task]);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={createNewTask}
      >
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
          <span className="error">Please enter a title</span>
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={userId}
              onChange={(event) => setUserId(+event.target.value)}
            >
              <option value={0}>Choose a user</option>

              {usersFromServer.map(person => (
                <option value={person.id} key={person.id}>
                  {person.name}
                </option>
              ))}
            </select>
          </label>

          <span className="error">Please choose a user</span>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
