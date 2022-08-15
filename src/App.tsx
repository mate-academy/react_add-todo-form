import {
  FC,
  useState,
  ChangeEvent,
  FormEvent,
} from 'react';
import { TodoList } from './components/TodoList/TodoList';

import { User } from './types/Users';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import './App.scss';

const getUserById = (userId: number): User | null => {
  const currentUser = usersFromServer.find(user => user.id === userId);

  return currentUser || null;
};

const getTodosWithUser = (): Todo[] => (
  todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }))
);

export const App: FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isChoseTitle, setIsChoseTitle] = useState(false);
  const [isChoseUser, setIsChoseUser] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(getTodosWithUser());

  const getNewTodoId = (): number => {
    return Math.max(...(todos.map(todo => todo.id))) + 1;
  };

  const addTodo = () => {
    const newTodo: Todo = {
      id: getNewTodoId(),
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodos(currentTodos => {
      return [...currentTodos, newTodo];
    });
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChoseTitle(true);
    setTitle(event.target.value);
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setIsChoseUser(true);
    setUserId(Number(event.target.value));
  };

  const resetDefaultFormStates = () => {
    setTitle('');
    setUserId(0);
    setIsChoseTitle(false);
    setIsChoseUser(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (title === '') {
      setIsChoseTitle(true);
    }

    if (userId === 0) {
      setIsChoseUser(true);
    }

    if (title && userId) {
      addTodo();
      resetDefaultFormStates();
    }
  };

  return (
    <div className="App box">
      <h1 className="title is-uppercase">
        Add todo form
      </h1>

      <form
        className="form"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
            className="
              input
              is-rounded
              is-black
            "
          />
          {(isChoseTitle === true && title === '')
            && (
              <span className="error">
                Please enter a title
              </span>
            )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
            className="select"
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {(isChoseUser === true && userId === 0)
            && (
              <span className="error">
                Please choose a user
              </span>
            )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          className="button is-info"
        >
          Add
        </button>
      </form>

      <TodoList
        todos={todos}
      />
    </div>
  );
};
