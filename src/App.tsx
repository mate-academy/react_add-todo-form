import { useMemo, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/todo';
import { User } from './types/user';

type TodoFromServer = Omit<Todo, 'user'>;

export const App = (): JSX.Element => {
  const [todos, setTodos] = useState<TodoFromServer[]>(todosFromServer);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const preparedTodos: Todo[] = useMemo(() => {
    return todos.map((todo: TodoFromServer) => {
      const user: User | undefined = usersFromServer.find(
        (foundUser: User) => foundUser.id === todo.userId,
      );

      return {
        ...todo,
        user: user || {
          id: 0,
          name: 'Unknown',
          email: '',
          username: '',
        },
      };
    });
  }, [todos]);

  const handleTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setTitle(event.target.value);

    if (hasTitleError) {
      setHasTitleError(false);
    }
  };

  const handleUserChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setSelectedUserId(event.target.value);

    if (hasUserError) {
      setHasUserError(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const normalizedTitle: string = title.trim();
    const titleIsEmpty: boolean = normalizedTitle === '';
    const userIsEmpty: boolean = selectedUserId === '';

    setHasTitleError(titleIsEmpty);
    setHasUserError(userIsEmpty);

    if (titleIsEmpty || userIsEmpty) {
      return;
    }

    const ids: number[] = todos.map((todo: TodoFromServer) => todo.id);
    const maxId: number = Math.max(0, ...ids);

    const newTodo: TodoFromServer = {
      id: maxId + 1,
      title: normalizedTitle,
      completed: false,
      userId: Number(selectedUserId),
    };

    setTodos((currentTodos: TodoFromServer[]) => [...currentTodos, newTodo]);

    setTitle('');
    setSelectedUserId('');
    setHasTitleError(false);
    setHasUserError(false);
  };

  return (
    <div className="App">
      <h1 className="title">Todos</h1>

      <div className="columns">
        <div className="column is-half">
          <TodoList todos={preparedTodos} />
        </div>

        <div className="column is-half">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label" htmlFor="title-input">
                Title
              </label>

              <div className="control">
                <input
                  id="title-input"
                  type="text"
                  data-cy="titleInput"
                  className={`input ${hasTitleError ? 'is-danger' : ''}`}
                  placeholder="Enter a title"
                  value={title}
                  onChange={handleTitleChange}
                />
              </div>

              {hasTitleError && <p className="error">Please enter a title</p>}
            </div>

            <div className="field">
              <label className="label" htmlFor="user-select">
                User
              </label>

              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    id="user-select"
                    data-cy="userSelect"
                    value={selectedUserId}
                    onChange={handleUserChange}
                  >
                    <option value="">Choose a user</option>

                    {usersFromServer.map((user: User) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {hasUserError && <p className="error">Please choose a user</p>}
            </div>

            <div className="field">
              <div className="control">
                <button
                  type="submit"
                  data-cy="submitButton"
                  className="button is-primary"
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
