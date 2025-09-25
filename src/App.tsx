import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { FormEvent, useState } from 'react';
import { Todos } from './Types/Todos';
import { getUserById } from './servise/Userservice';

//#region function
export const initialTodos: Todos[] = todosFromServer.map(todos => ({
  ...todos,
  user: getUserById(todos.userId) || null,
}));

function getNewTodoId(todo: Todos[]) {
  const maxId = Math.max(...todo.map(todoItem => todoItem.id));

  return maxId + 1;
}
//#endregion

export const App = () => {
  const [todoList, setTodo] = useState<Todos[]>(initialTodos);

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  const formReset = () => {
    setTitle('');
    setUserId(0);
  };

  const addTodo = (todo: Todos) => {
    setTodo(currentTodo => [...currentTodo, todo]);
  };

  const getFormCheck = (event: FormEvent) => {
    event.preventDefault();

    setTitleError(!title);
    setUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    addTodo({
      id: getNewTodoId(todoList),
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    });

    formReset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form onSubmit={getFormCheck}>
        <div className="field">
          <input
            value={title}
            type="text"
            data-cy="titleInput"
            placeholder="Please enter a title"
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdChange}
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
          {userIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todoList} />
    </div>
  );
};
