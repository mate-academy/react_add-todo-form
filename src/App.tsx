import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import type { Todo } from './components/TodoInfo';

function getNewTodosId(todoList: Todo[]) {
  const maxId = Math.max(...todoList.map(todo => todo.id), 0);

  return maxId + 1;
}

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todoList, setTodoList] = useState<Todo[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId)!,
    })),
  );
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    let hasError = false;

    if (!title.trim()) {
      setTitleError(true);
      hasError = true;
    }

    if (userId === 0) {
      setUserError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // const user = usersFromServer.find(user1 => user1.id === userId);

    const user = getUserById(userId)!;

    const newTodo: Todo = {
      id: getNewTodosId(todoList),
      title,
      completed: false,
      user,
      userId,
    };

    setTodoList(prev => [...prev, newTodo]);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={addTodo}>
        <div className="field">
          <label htmlFor="title-id">Title: </label>

          <input
            type="text"
            id="title-id"
            data-cy="titleInput"
            value={title}
            placeholder="Please enter a title"
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
        </div>

        <div className="field">
          <label htmlFor="user-id">User: </label>

          <select
            id="user-id"
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              setUserError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {titleError && <span className="error">Please enter a title</span>}
        {userError && <span className="error">Please choose a user</span>}

        <button data-cy="submitButton" type="submit">
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
